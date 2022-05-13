const router = require("express").Router();
const Type = require("../../models/Type");
const Subtype = require("../../models/Subtype");
const RequestForm = require("../../models/RequestForm");
const User = require("../../models/User");

// validation
const Joi = require("joi");

//validation schema
const formSchema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  surname: Joi.string().min(4).max(255),
  email: Joi.string().min(6).max(255).required().email(),
  phone: Joi.number(),
  birth: Joi.string(),
  sex: Joi.string(),
  type: Joi.string().min(6).max(1024).required(),
  subtype: Joi.string().min(6).max(1024).required(),
  message: Joi.string().min(6).max(1024),
  terms: Joi.allow(),
});

const calculateLastRequestTime = (lastReq) => {
  const msBetweenDates = Math.abs(lastReq.getTime() - new Date().getTime());
  return {
    hoursBetweenDates: msBetweenDates / (60 * 60 * 1000),
    msForNewRequest: 60 * 60 * 1000 * 24 - msBetweenDates,
  };
};

const convertMsToHM = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;
  hours = hours % 24;
  return `${hours.toString().padStart(2, "0")} hours and ${minutes
    .toString()
    .padStart(2, "0")} minutes`;
};

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

router.post("/request-form", async (req, res) => {
  console.log(req.body);

  //check user in our db
  const user = await User.findById(req.user.id);
  if (!user)
    res.status(403).json({
      error:
        "Your user is not in our db. Please register or login with your account.",
    });

  //Check last Request > 24h
  if (user.lastRequest) {
    const lastReqTime = calculateLastRequestTime(user.lastRequest);
    if (lastReqTime.hoursBetweenDates < 24) {
      return res.status(403).json({
        error:
          "You are not allowed to submit a new form, please try again in " +
          convertMsToHM(lastReqTime.msForNewRequest),
      });
    }
  }

  // validate form
  const { error } = formSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  //Find type
  const type = await Type.findOne({
    name: req.body.type,
  });
  if (!type) return res.status(400).json({ error: "This type doesnt exist" });

  //Find Subtype
  const subtype = await Subtype.findOne({
    name: req.body.subtype,
  });
  if (!subtype)
    return res.status(400).json({ error: "This subtype doesnt exist" });

  //Save form
  const form = new RequestForm(req.body);
  await form.save();

  //Update User LastRequest field to prevent from submitting a new form before 24 hours
  await User.findByIdAndUpdate(req.user.id, { lastRequest: new Date() });

  return res
    .status(200)
    .json({ error: null, message: "Form successfully saved" });
});

// SUPERADMIN ENDPOINTS

router.get("/forms", async (req, res) => {
  await RequestForm.find({}).exec(function (err, forms) {
    return res.json({
      error: err,
      forms,
    });
  });
});

module.exports = router;
