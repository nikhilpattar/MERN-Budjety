import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secretKey = 'DFHDLJKHLDJGHAJNSDBFAJSHDJFHJKDSFHJAHKJ';

export default async (req, res, next) => {
    const usernameReq = req.body.username;
    const passwordReq = req.body.password;
    if (usernameReq && passwordReq) {
        try {
            const result = await User.find({ username: usernameReq, password: passwordReq });
            if (result.length != 0) {
                let user = result[0];
                let uId = user.uId;
                let firstName = user.firstName;
                let lastName = user.lastName;
                const payload = {
                    sub: user.uId
                }

                const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
                res.json({ token, firstName, lastName , uId});
            } else {
                res.status(400).json({ message: `Unauthorised user` });
            }
        } catch (error) {
            res.status(400).json({ message: `Failed to fetch user` });
        }
    } else {
        res.status(401).json({ err_message: 'Invalid username and password' });
    }
}