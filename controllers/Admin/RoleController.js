import { errorResponse, successResponse } from "../../helpers/ResponseBuilder.js";
import Role from "../../models/Role.js";
import { roleResource } from "../../resource/RoleResource.js";


export const allRoles = async(req,res) =>{
    try {
        const all_roles = await Role.find();
        const data = await roleResource(all_roles);
        return res.status(200).json(successResponse(data));

    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}
