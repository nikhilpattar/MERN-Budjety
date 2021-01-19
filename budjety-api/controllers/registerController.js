import User from '../models/User.js';

export default async (req, res, next) => {

    let id = req.body.username + (new Date()).getTime();

    const user = new User(
        {
            uId: id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
    );
    try {
        const userDataPost = await user.save();
        res.status(200).json(userDataPost);
    } catch (error) {
        res.status(400).json({ err_message: `Failed to add user` });
    }
}