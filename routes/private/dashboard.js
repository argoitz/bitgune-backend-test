const router = require("express").Router();
const Type = require("../../models/Type");

// validation
const Joi = require("joi");

router.get("/request-form", async (req, res) => {
  await Type.find({})
    .populate("subtypes")
    .exec(function (err, types) {
      return res.json({
        error: err,
        types,
      });
    });
});

//#### REGISTER ENDPOIN ####
const formSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

router.post("/request-form", async (req, res) => {
  // validate user

  //TODO: Create form schema with params
  const { error } = formSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //TODO:
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res
      .status(400)
      .json({ error: "The current email is already registered" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  //Store new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
