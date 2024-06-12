import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Bug from "../../models/Bug.js";
import Project from "../../models/Project.js";
import User from "../../models/User.js";
import { bugResource, singleBugResource } from "../../resource/BugResource.js";
import { projectResource } from "../../resource/ProjectResource.js";

import mongoose from 'mongoose';

export const addBug = async (req, res, next) => {
    try {
        const { title, description, assign_to } = req.body;
        const projectId = req.params.id;
        const user = req.user;
        const userRoles = user.roles; // Assuming roles are stored in an array on the user object

        // Check if the user has the required role
        const hasValidRole = userRoles.includes('tester') || userRoles.includes('business_team');
        if (!hasValidRole) {
            return res.status(403).json(errorResponse("User does not have the required role to add a bug"));
        }

        const userId = user._id;

        // Check if the project exists and if the user is a member of it
        const getProject = await Project.findOne({ _id: projectId, members: userId });
        if (!getProject) {
            return res.status(404).json(errorResponse("Project not found or user not assigned to the project"));
        }

        // Ensure assign_to is an array of user IDs and convert them to ObjectId
        const assignToIds = assign_to.map(role => new mongoose.Types.ObjectId(role.id.toString() || role._id.toString()));

        const arr2 = [];
        assign_to.forEach(function(object) {
            arr2.push(object.id)
          })
          console.log("arr2",arr2);
        // Check if all assigned users are members of the project
        const projectMemberIds = getProject.members.map(member => member.toString());
        const allIdsValid = assignToIds.every(id => projectMemberIds.includes(id.toString()));
        if (!allIdsValid) {
            return res.status(404).json(errorResponse("One or more assigned users are not members of the project"));
        }

        // Check if all assigned user IDs exist in the User collection
        const users = await User.find({ _id: { $in: assignToIds } });
        if (users.length !== assignToIds.length) {
            return res.status(404).json(errorResponse("One or more assigned users not found"));
        }

        // Create a new bug
        const newBug = new Bug({ title, description, project: projectId, assigned_by: userId, assigned_to: assignToIds });
        await newBug.save();

        const bugAdded = await singleBugResource(newBug);
        return res.status(200).json(successResponse(bugAdded));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}


export const getBugs = async(req,res,next)=>{
 

    try{
        const projectId = req.params.id;
        const user   = req.user;
        const userId = user._id;
        const userRoles = user.roles; // Assuming roles are stored in an array on the user object
        const getProject = await Project.findOne({_id:projectId,members:userId});
        if (!getProject) {
            return res.status(404).json(errorResponse("Project not found or user not assigned to the project"));
        } 

        const currentPage = parseInt(req.query.page) || 1;
        const perPage     = 50;
        const allBugs    = await Bug.find({project:projectId}).populate('assigned_by','_id name').populate('assigned_to','_id name')
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();
        const totalItems = await Bug.countDocuments();
        const totalPages = Math.ceil(totalItems / perPage);
        const data       = await bugResource(allBugs);
        return res.status(200).json(successWithPagination(data, currentPage, totalPages));
        
    }catch(err){
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
   

}