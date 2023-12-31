import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name : String,
    email :String,
    confirmEmail: {
        type: Boolean,
        default: true
    } ,
    role: {
        type: String,
        default: 'admin',
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online']
    },
    forgetCode: {
        type: Number,
        default: null
    },
    changePasswordTime: {
        type: Date
    }
},{
    timestamps: true
});

const adminModel = mongoose.model('admin', adminSchema);

export default adminModel;