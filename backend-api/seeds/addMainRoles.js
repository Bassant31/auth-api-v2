require("../db/mongoose");
const Role = require("../models/role");

const addMainRoles = async () => {
  const testerRole = await Role.findOne({ name: "tester" });
  const devRole = await Role.findOne({ name: 'developer' });

  if (!testerRole && !devRole) {
    const tester = new Role({
      name: "tester",
      description: "Tests code modules",
    });
    const developer = new Role({
      name: "developer",
      description: "Developes code modules",
    });
    await Role.insertMany([tester, developer]);
    console.log("main roles created");
  }
};

addMainRoles();
