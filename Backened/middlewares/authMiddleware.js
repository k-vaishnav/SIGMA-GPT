import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized' });
        }
        const tokenValue = token.split(' ')[1];
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
export default authMiddleware;