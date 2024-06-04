import { listPagination } from "../../config/constant.js";
import { errorResponse, successResponse, successWithPagination } from "../../helpers/ResponseBuilder.js";
import Role from "../../models/Role.js";
import User from "../../models/User.js";
import { userResource, userShortResource, singleUserResource } from "../../resource/UserResource.js";
import bcrypt from 'bcryptjs'


export const userList = async(req,res) =>{
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = 50;
        const allusers = await User.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();
        const totalItems = await User.countDocuments();
        const totalPages = Math.ceil(totalItems / perPage);
        const data = await userResource(allusers);
        return res.status(200).json(successWithPagination(data, currentPage, totalPages));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}


export const allUsers = async(req,res) =>{
    try {
        const allusers = await User.find();
        const data = await userShortResource(allusers);
        return res.status(200).json(successResponse(data));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}

export const userCreate = async(req,res) =>{
    try {
        const {name,email,password,roles} = req.body;
        var hashPassword = bcrypt.hashSync(password);

        // if(roles.length == 0){

        // }


        if (!Array.isArray(roles)) {
             return res.status(403).json(errorResponse("Please select role"));
        }

        const existingRoles = await Role.find({ slug: { $in: roles } }).exec();
        
        if (existingRoles.length !== roles.length) {
            return res.status(403).json(errorResponse("roles not found"));

        } 
        
        const newUser = new User({name,email,password:hashPassword,roles});
        await newUser.save();
        const createdUser = await singleUserResource(newUser);
        return res.status(200).json(successResponse(createdUser));
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}


export const info = async(req,res) => {
    try{

        const userId = req.params.id;
        const getUser = await User.findById(userId);
        if (!getUser) {
            return res.status(500).json(errorResponse("Invalid User"));

        }
        const user = await singleUserResource(getUser);
        return res.status(200).json(successResponse(user));
    }catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}



export const update = async(req,res) =>{
    try {
        const userId = req.params.id;
        const getUser = await User.findById(userId);
        if (!getUser) {
            return res.status(500).json(errorResponse("Invalid user"));

        }
        const {name,email,roles} = req.body;
       


        if (!Array.isArray(roles) || roles.length === 0) {
            return res.status(403).json(errorResponse("Please select role"));
       }

       const existingRoles = await Role.find({ slug: { $in: roles } }).exec();
       
       if (existingRoles.length !== roles.length) {
           return res.status(403).json(errorResponse("roles not found"));

       } 
       
        getUser.name = name;
        getUser.email = email;
        getUser.roles = roles;


        await getUser.save();
        const updatedUser = await singleUserResource(getUser);
        return res.status(200).json(successResponse(updatedUser));
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }

}



export const updateStatus = async(req,res) =>{
    try {
        const userId = req.params.id;
        const getUser = await User.findById(userId);
        if (!getUser) {
            return res.status(500).json(errorResponse("Invalid user"));

        }
        var newStatus = 'active';
        console.log("getUser",getUser.status);
        if(getUser.status == 'active'){
            newStatus = 'inactive'
        }
        getUser.status = newStatus;
        await getUser.save();
        const updatedUser = await singleUserResource(getUser);
        return res.status(200).json(successResponse(updatedUser));
    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }

}

