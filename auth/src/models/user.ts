import mongoose from "mongoose";
import { Password } from '../services/password';

interface UserAttrs {
    email: string;
    password: string;
    name: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
};

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    name: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await Password.toHash(this.get('password'));
    }
    next();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);



export { User };