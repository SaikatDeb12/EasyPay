import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

const UserModel = model("Users", userSchema);
const AccountModel = model("Accounts", accountSchema);

export { UserModel, AccountModel };
