import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            response.status(401).json({ error: 'No token provided, authorization denied' })
        }
        const verifiedAndDecoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(verifiedAndDecoded);

        ////////////////////// Here are my adds 
        request.token= token; 
        
        
        
        
        // ancien code
        const user = await User.findById(verifiedAndDecoded.userId);
        request.user = user;
        next()
    } catch (error) {
        response.status(401).json({ error: 'Invalid/Expired token' })
    }
}

export default checkAuth