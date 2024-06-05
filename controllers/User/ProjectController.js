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