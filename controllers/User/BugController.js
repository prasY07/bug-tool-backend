import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Bug from "../../models/Bug.js";
import Project from "../../models/Project.js";
import { singleBugResource } from "../../resource/BugResource.js";
import { projectShortResource } from "../../resource/ProjectResource.js";
import { userShortResource } from "../../resource/UserResource.js";



export const addBug = async (req, res, next) => {

    try {

        const {title,description,assign_to} = req.body;
        const projectId = req.params.id;
        const user   = req.user;
        const userRoles = user.roles; // Assuming roles are stored in an array on the user object

        // Check if the user has either 'tester' or 'business_team' roles
        const hasValidRole = userRoles.includes('tester') || userRoles.includes('business_team');
        if (!hasValidRole) {
            return res.status(403).json(errorResponse("User does not have the required role to add a bug"));
        }


        const userId = user._id;
        const getProject = await Project.findOne({_id:projectId,members:userId});
        if (!getProject) {
            return res.status(404).json(errorResponse("Project not found or user not assigned to the project"));
        } 

        const newBug = new Bug({title,description,project:projectId,assigned_by:userId,assign_to});
        await newBug.save();

        const bugAdded = await singleBugResource(newBug);
        return res.status(200).json(successResponse(bugAdded));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));

    }

}