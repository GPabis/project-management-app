import  mongoose  from "mongoose";

interface UserModel {
  email: string,
  username: string,
  password: string,
  token: string,
}

const Schema = mongoose.Schema;

const userShema = new Schema<UserModel>({
  email:{
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  }
})

const User = mongoose.models.User || mongoose.model<UserModel>('User', userShema);

export default User;