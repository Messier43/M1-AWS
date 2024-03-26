import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            console.error('No token provided, authorization denied');
            return response.status(401).json({ error: 'No token provided, authorization denied' });
        }

        // Extraire le token du header
        const tokenParts = token.split(' ');
        const tokenBearer = tokenParts[0];
        const tokenValue = tokenParts[1];

        if (tokenBearer !== 'Bearer' || !tokenValue) {
            console.error('Invalid token format');
            return response.status(401).json({ error: 'Invalid token format' });
        }

        // Vérifier le token JWT
        const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken);

        // Vérifier si l'utilisateur associé au token existe
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            console.error('User not found');
            return response.status(401).json({ error: 'User not found' });
        }

        // Si tout est bon, attacher l'utilisateur à l'objet request et passer au middleware suivant
        request.user = user;
        next();
    } catch (error) {
        console.error('Error in checkAuth middleware:', error);
        return response.status(401).json({ error: 'Invalid/Expired token' });
    }
}

export default checkAuth;