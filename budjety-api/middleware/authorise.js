import jwt from 'jsonwebtoken';

const secretKey = 'DFHDLJKHLDJGHAJNSDBFAJSHDJFHJKDSFHJAHKJ';

export default (req, res, next) => {

    if (!req.url.startsWith('/login') && !req.url.startsWith('/register')) {

        const authorizationKey = req.headers['Authorization'];

        if (!authorizationKey) {
            res.status(401).json({ error_message: 'Authorization key is missing' });
            return;
        }

        const [bearer, token] = authorizationKey.split(' ');

        if (!token) {
            res.status(401).json({ info_message: 'Token is missing' });
            return;
        }
        try {
            jwt.verify(token, secretKey);
            next();
        } catch (error) {
            res.status(401).json({ error_message: 'Invalid Token' })
        }

    } else {
        next();
    }
}