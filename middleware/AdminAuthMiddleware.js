
// import { jwtConfig } from "../jwt.js";
import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers/ResponseBuilder.js";
import Admin from "../models/Admin.js";

export const verifyAdminByToken = async (req, res, next) => {
  const token = req.headers.authorization; // Extract the token from the request headers
console.log("hereee");
  if (!token) {
    return res.status(401).json(errorResponse("Unauthorized"));
  }

  try {
    const jwtSecret = process.env.jwtSecret;

    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenWithoutBearer, jwtSecret);
    const admin = await Admin.findOne({ tokens: tokenWithoutBearer });
    if (admin) {
      req.admin = admin;
      next();

    } else {

      return res.status(404).json(errorResponse("Admin not found"));

    }
  } catch (error) {
    console.error(error);
    return res.status(401).json(errorResponse("Token is invalid"));
  }
};

