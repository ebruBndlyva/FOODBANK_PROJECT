export const verifyRole = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid Token' });
            }
            
       
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'You do not have permission to access this resource.' });
            }


            req.user = decoded;
            next();
        });
    };
};
