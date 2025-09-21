import jwt from 'jsonwebtoken';

export const authenticate = (res,res,next) => {
    const token = req.header?.authenticate?.split(' ')[1];
    if(!token) {
        return res.status(401).json({
           message: 'Access denied. No token found.'
        })
    }
    try {
       const decoded =  jwt.verify(token,process.env.JWT_SECRET);
       req.user = decoded;
       next();
          
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token.'
        })

        
    }
}