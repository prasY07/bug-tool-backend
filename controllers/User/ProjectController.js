import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Project from "../../models/Project.js";
import { projectResource, projectShortResource, singleProjectResource } from "../../resource/ProjectResource.js";
import { userShortResource } from "../../resource/UserResource.js";


export const getAssignProjects = async (req, res, next) => {

    try {
        const user = req.user;
        const userId = user._id;

        const currentPage = parseInt(req.query.page) || 1;
        const perPage = 100;

        const getAssignProjects = await Project.find({ members: userId })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .exec();
        const totalItems = await Project.countDocuments();
        const totalPages = Math.ceil(totalItems / perPage);
        const data = await projectShortResource(getAssignProjects);
        return res.status(200).json(successWithPagination(data, currentPage, totalPages));


      
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}


export const getProjectDetails = async(req,res,next) => {
    try{
        const projectId = req.params.id;
        const user   = req.user;
        const userId = user._id;
        const getProject = await Project.findOne({_id:projectId,members:userId}).populate('members','_id name');
        console.log("getProject",getProject);
      
          if (!getProject) {
            return res.status(404).json(errorResponse("Project not found or user not assigned to the project"));
          }
      
          const getProjectDetails =  await singleProjectResource(getProject);
          
          return res.status(200).json(successResponse(getProjectDetails));

    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}


export const getProjectAssignMember = async(req,res,next) => {

    try{

        const projectId = req.params.id;
        const user   = req.user;
        const userId = user._id;
        const getProject = await Project.findOne({_id:projectId,members:userId}).populate('members', 'name _id');
        ;
        console.log("getProject",getProject.members);
      
        if (!getProject) {
            return res.status(404).json(errorResponse("Project not found or user not assigned to the project"));
        } 

        const membersExceptSelf = getProject.members.filter(member => !member._id.equals(userId));
        const users = await userShortResource(membersExceptSelf);
        return res.status(200).json(successResponse(users));

        
    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}