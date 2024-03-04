import bcryptjs from "bcryptjs";
import User from "./user.model.js";

export const userPost = async (req, res) => {
    const { username, email, password} = req.body;
    const user = new User({username, email, password}); 

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        msg: "User added to database!!!"
    });
}

export const putUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, email, oldPassword, ...resto } = req.body;
    const usuarioAutenticado = req.user; // Asumiendo que el usuario autenticado está disponible en req.usuario

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: 'the user don´t exist' });
        }

        if (usuarioAutenticado._id.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You don´t have access to update this user' });
        }

        const validatePassword = await bcryptjs.compare(oldPassword, user.password);

        if (!validatePassword) {
            return res.status(401).json({ msg: "Incorrect old password" });
        }

        if (resto.password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(resto.password, salt);
        }

        await User.findByIdAndUpdate(id, resto);

        const usuarioActualizado = await User.findById(id);

        res.status(200).json({
            msg: 'User Update',
            user: usuarioActualizado
        });
    } catch (error) {
        console.error('ERROR to update user:', error);
        res.status(500).json({ error: 'ERROR to update user' });
    }
}
