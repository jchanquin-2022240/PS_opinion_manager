import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    userStatus:{
        type: Boolean,
        default: true
    }
});


/*UserSchema.methods.toJSON = funtion() {
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}*/

export default mongoose.model('User', UserSchema);