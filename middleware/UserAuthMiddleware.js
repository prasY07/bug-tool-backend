
// import { jwtConfig } from "../jwt.js";
import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers/ResponseBuilder.js";
import User from "../models/User.js";

export const verifyUserByToken = async (req, res, next) => {
  const token = req.headers.authorization; // Extract the token from the request headers
console.log("hereee user ");
  if (!token) {
    return res.status(401).json(errorResponse("Unauthorized"));
  }

  try {
    const jwtSecret = process.env.jwtSecret;

    const tokenWithoutBearer = token.replace('Bearer ', '');
    console.log("tokenWithoutBearer",tokenWithoutBearer);

    const decoded = jwt.verify(tokenWithoutBearer, jwtSecret);
    console.log("decoded",decoded);
    const user = await User.findOne({ tokens: tokenWithoutBearer });
    console.log("user",user);

    if (user) {
      req.user = user;
      next();

    } else {

      return res.status(404).json(errorResponse("User not found"));

    }
  } catch (error) {
    console.error(error);
    return res.status(401).json(errorResponse("Token is invalid"));
  }
};

