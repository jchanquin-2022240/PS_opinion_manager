import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';


export const login = async (req, res) => {
    const { username, email, password} = req.body;

    try {
        let userLogin = await User.findOne({email});

        if (!userLogin) {
            userLogin = await User.findOne({ username});
            if (!userLogin) return res.status(400).json({ msg: "Incorrect credentials" });
        }

        if (!userLogin.userStatus) {
            return res.status(400).json({
                msg: "The user does not exist in the database"
            });
        }

        const validPassword = bcryptjs.compareSync(password, userLogin.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect"
            });
        }

        const token = await generateJWT( userLogin.id );

        return res.status(200).json({ msg: "Login Successfully!!!", userLogin, token});
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Contact the owner"});
    }
}