import { listPagination } from "../../config/constant.js";
import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Project from "../../models/Project.js";
import { singleProjectResource } from "../../resource/ProjectResource.js";


export const projectList = async(req,res) =>{
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const perPage     = 50;
        const allusers    = await Project.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();
        const totalItems = await Project.countDocuments();
        const totalPages = Math.ceil(totalItems / perPage);
        const data       = await userResource(allusers);
        return res.status(200).json(successWithPagination(data, currentPage, totalPages));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}

export const projectCreate = async(req,res) =>{
    try {
        const {name,description,selectedUsers,deadline_date} = req.body;
        await Project.find({ _id: { $in: selectedUsers } })
        .exec().catch((err) => {
            return res.status(403).json(errorResponse("Invalid Users"));
        });
        const project_id    = Date.now();
        const added_by            = '6648f75af825ce5d7db41620';
        const newProject = new Project({name,description,added_by,members:selectedUsers,project_id,deadline_date});
        await newProject.save();
        const createdProject = await singleProjectResource(newProject);
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
        const project = await singleProjectResource(getProject);
        return res.status(200).json(successResponse(project));
    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}



export const projectUpdate = async(req,res) =>{
    try {
        const projectId = req.params.id;
        const getProject = await Project.findById(projectId);
        if (!getProject) {
            return res.status(404).json(errorResponse("Invalid Project"));

        }
        const {name,description,selectedUsers,deadline_date} = req.body;
        await Project.find({ _id: { $in: selectedUsers } })
        .exec().catch((err) => {
            return res.status(403).json(errorResponse("Invalid Users"));
        });
       
      

        getProject.name = name;
        getProject.description = description;
        getProject.members = selectedUsers;
        getProject.deadline_date = deadline_date;
        

        await getProject.save();
        const updatedProject = await singleProjectResource(getProject);
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

