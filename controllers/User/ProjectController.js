import { errorResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Project from "../../models/Project.js";
import { projectShortResource } from "../../resource/ProjectResource.js";


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
        const getProject = await Project.findOne({_id:projectId,members:userId});
        console.log("getProject",getProject);

        
      
          // Check if the project exists
          if (!getProject) {
            return res.status(404).json({
              success: false,
              message: 'Project not found or user not assigned to the project'
            });
          }
      


    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}