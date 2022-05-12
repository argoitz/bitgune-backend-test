const Type = require("../models/Type");
const Subtype = require("../models/Subtype");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const PopulateSeeders = async () => {
  console.log("START SEEDING");

  const requestTypeSubtypes = {
    Información: ["Productos", "Promociones", "Devoluciones", "Envíos"],
    "Incidencia Técnica": ["Instalación", "Envíos"],
    Otros: [],
  };

  try {
    //Save types with subtypes relation
    for (let [k, subtypes] of Object.entries(requestTypeSubtypes)) {
      const type = new Type({
        name: k,
      });
      const savedType = await type.save();

      subtypes.map(async (subtype) => {
        const rSubtype = new Subtype({
          name: subtype,
        });
        await rSubtype.save().then((result) => {
          Type.findOne({ name: k }, (err, type) => {
            if (type) {
              type.subtypes.push(rSubtype);
              type.save();
            }
          });
        });
      });
    }

    console.log(" - TYPE AND SUBTYPE SEED FINISHED");
  } catch (error) {
    console.log(error);
  }

  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("admin", salt);

    //Save superadmin user
    const adminUser = new User({
      name: "Admin",
      email: "admin@admin.com",
      password: password,
      role: "admin",
    });

    await adminUser.save();

    console.log(" - ADMIN USER SEED FINISHED");
  } catch (error) {
    console.log(error);
  }

  console.log("DB successfully populated");

  process.exit();
};

module.exports = PopulateSeeders;
