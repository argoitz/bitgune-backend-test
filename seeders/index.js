const Type = require("../models/Type");
const Subtype = require("../models/Subtype");
const User = require("../models/User");
const RequestForm = require("../models/RequestForm");
const bcrypt = require("bcryptjs");

const PopulateSeeders = async () => {
  console.info("START SEEDING");

  const requestTypeSubtypes = {
    Información: ["Productos", "Promociones", "Devoluciones", "Envíos"],
    "Incidencia Técnica": ["Instalación", "Envíos"],
    Otros: [],
  };

  //CHeck if db is populated yet
  const adminUserExist = await User.findOne({ email: "admin@admin.com" });
  if (!adminUserExist) {
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

      console.info(" - TYPE AND SUBTYPE SEED FINISHED");
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
        lastRequest: null,
      });

      await adminUser.save();

      console.info(" - ADMIN USER SEED FINISHED");
    } catch (error) {
      console.log(error);
    }

    const requestForms = [
      {
        name: "test",
        surname: "Test test",
        email: "test@test.com",
        phone: 666555444,
        birth: "1987-11-15",
        sex: "male",
        type: "Información",
        subtype: "Promociones",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        date: new Date(),
      },
      {
        name: "test2",
        surname: "Test2 test",
        email: "test2@test.com",
        phone: 666555444,
        birth: "1987-11-15",
        sex: "male",
        type: "Información",
        subtype: "Promociones",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        date: new Date(),
      },
      {
        name: "test3",
        surname: "Test3 test",
        email: "test3@test.com",
        phone: 666555444,
        birth: "1987-11-15",
        sex: "male",
        type: "Información",
        subtype: "Promociones",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        date: new Date(),
      },
    ];
    try {
      //Save superadmin user
      requestForms.map(async (form) => {
        const newForm = new RequestForm(form);
        await newForm.save();
      });

      console.info(" - REQUEST FOM SEEDS FINISHED");
    } catch (error) {
      console.log(error);
    }

    console.info("DB successfully populated");
  } else {
    console.info("DB is populated yet");
  }

  return true;
  // process.exit(1);
};

module.exports = PopulateSeeders;
