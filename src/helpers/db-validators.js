import User from "../users/user.model.js";

export const existingEmail = async (email = '') => {
    const emailExists = await User.findOne({email});
    if (emailExists) {
        throw new Error(`Email ${email} already exists in the database`);
    }
}

export const existingUsername = async (username = '') => {
    const usernameExists = await User.findOne({username});
    if (usernameExists) {
        throw new Error(`Username ${username} already exists in the database`);
    }
}

export const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The id: ${email} don't exist`)
    }
}