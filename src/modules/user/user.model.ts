import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserDocument } from "./user.interface";
import { USER_ROLE } from "./user.constant";

const userSchema = new Schema<IUserDocument,IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    role: { type: String, enum: Object.values(USER_ROLE), default: USER_ROLE.USER },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
}
next()
}
)
// ✅ Document method
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
    console.log(this.password,"this.password",password)
  return await bcrypt.compare(password,this.password);
};

export const User = mongoose.model<IUserDocument>("User", userSchema);
