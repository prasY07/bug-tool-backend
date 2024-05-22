import { listPagination } from "../../config/constant.js";
import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Project from "../../models/Project.js";


export const projectList = async(req,res) =>{
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = 50;
        const allusers = await Project.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();
        const totalItems = await Project.countDocuments();
        const totalPages = Math.ceil(totalItems / perPage);
        const data = await userResource(allusers);
        return res.status(200).json(successWithPagination(data, currentPage, totalPages));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}

export const projectCreate = async(req,res) =>{
    try {
        const {title,description} = req.body;
        const newProject = new Project({title,description});
        await newProject.save();
        const createdProject = await singleUserResource(newProject);
        return res.status(200).json(successResponse(createdProject));
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}


export const projectInfo = async(req,res) => {
    try{

        const projectId = req.params.id;
        const getProject = await Project.findById(projectId);
        if (!getProject) {
            return res.status(500).json(errorResponse("Invalid Project"));

        }
        const project = await singleUserResource(getProject);
        return res.status(200).json(successResponse(project));
    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}



export const projectUpdate = async(req,res) =>{
    try {
        const projectId = req.params.id;
        const getProject = await User.findById(projectId);
        if (!getProject) {
            return res.status(500).json(errorResponse("Invalid user"));

        }
        const {name,email} = req.body;
        getProject.name = name;
        getProject.email = email;
        

        await getProject.save();
        const updatedProject = await singleUserResource(getProject);
        return res.status(200).json(successResponse(updatedProject));
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }

}



export const projectStatus = async(req,res) =>{
    try {
        const projectId = req.params.id;
        const getProject = await Project.findById(projectId);
        if (!getProject) {
            return res.status(500).json(errorResponse("Invalid project"));
        }
        const {status} = req.body;
       
        getProject.status = status;
        await getProject.save();
        const updatedUser = await singleUserResource(getProject);
        return res.status(200).json(successResponse(updatedUser));
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }

}

