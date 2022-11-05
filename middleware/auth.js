import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) =>{
    try {
        const token = req.body.token || req.query.token || req.headers['access-token']
    
        if(!token){
            return res.status(403).json({
                status: false,
                message: `A token is required for authentication`
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded
        
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: `Invalid Token`
        })
    }
    return next();
} 