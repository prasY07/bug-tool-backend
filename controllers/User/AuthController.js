import bcrypt from 'bcryptjs'
import { errorResponse, successResponse, successWithTokenResponse } from "../../helpers/ResponseBuilder.js";
// import { jwtConfig } from "../../jwt.js";
import jwt from "jsonwebtoken";
import Admin from '../../models/Admin.js';
import { config as configDotenv } from 'dotenv';
configDotenv();



export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        let existingUser;
        existingUser = await Admin.findOne({ email });
        if (!existingUser) {
            return res.status(403).json(errorResponse("Email not exists!!"));
        }
        var isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(403).json(errorResponse("Please enter correct password"));
        }

        if(existingUser.status == 'inactive'){
            return res.status(403).json(errorResponse("Your account is inactive. please contact to admin"));

        }
        // User is authenticated, generate a JWT token
        const jwtSecret = process.env.jwtSecret;
        const expiresIn = process.env.expiresIn;
        const token = jwt.sign(
            {
                adminId: existingUser._id, // Include user-specific data in the token payload
                email: existingUser.email,
            },
            jwtSecret, // Replace with your actual secret key
            {
                expiresIn: expiresIn, // Token expiration time (e.g., 1 hour)
            }
        );
        existingUser.tokens.push(token);

        // Save the updated user document with the new token
        await existingUser.save();
        return res.status(200).json(successWithTokenResponse(existingUser, "Login successfully", token));


    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}

export const logout = async (req, res, next) => {

    const tokenToRemove = req.headers.authorization.replace('Bearer ', ''); 

    try {
        // Remove the token from the user's tokens array
        const admin = req.admin;
        admin.tokens = admin.tokens.filter((token) => token !== tokenToRemove);

        await admin.save(); // Save the user with the token removed
        return res.status(200).json(successResponse(null, "Logout successfully"));

    } catch (error) {
        console.error(error);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));

    }
}