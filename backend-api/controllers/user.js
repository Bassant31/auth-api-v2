const User = require("../models/user");
const Role = require("../models/role");
const credentialValidation = require("../helper/validation");

const createNewUser = async (body, res) => {
  try {
    const { email } = body;
    const existingUser = await User.findOne({email});
    if (!existingUser) {
      const user = new User(body);
      await User.create(user)
      res.status(201).send({ user});
    }
    else {
        throw new Error("Please try another email")
    }

  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
const userLogin = async (body, res) => {
  try {
    const {email,password} = body
    credentialValidation(email, password);
    const user = await User.findbyCredentials(email,password)

    const token = await user.generateAuthToken();

    const info = await user.populate("role");
    res.send({ token, info });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const getUsers = async (res) => {
  try {
    const users = await User.find({ admin: false }).populate("role");
    res.send({ users });
  } catch (e) {
    res.status(500).send();
  }
};

const getUserInfo = async (user, res) => {
 
  const info = await user.populate("role");
  res.send(info);
};

const updateUserRole = async (body, res) => {
  try {
    
    const newRole = await Role.findOne({ name:body.role });

    const updateRole = newRole ? newRole._id : null 

    const user = await User.findByIdAndUpdate(
        body.id,
        { role: updateRole },
        { new: true }
      );
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  createNewUser,
  userLogin,
  getUsers,
  getUserInfo,
  updateUserRole,
};
