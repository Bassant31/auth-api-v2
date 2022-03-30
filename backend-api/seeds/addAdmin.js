require("../db/mongoose");
const User = require("../models/user");

const addAdmin = async () => {
  const user = await User.findOne({ email: 'Bassant@test.com' });
  if (!user) {
    const admin = new User({
      name: "Bassant",
      email: "Bassant@test.com",
      password: "admin123",
      admin: true,
    });
    await User.create(admin);
    console.log("Admin Created");
  }
};

addAdmin();
