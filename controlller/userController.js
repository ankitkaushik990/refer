const userService = require("../service/userService");

exports.signup = async (req, res) => {
  console.log("in signup the user  ");
  try {
    const { name, email, referralCode } = req.body;

    const _id = await userService.signup(name, email, referralCode);

    res.status(201).send({ id: _id });
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ message: error.message });
  }
};

exports.getall = async (req, res) => {
  console.log("in getall  the user  ");
  try {
    const user = await userService.getall();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ message: error.message });
  }
};

exports.byID = async (req, res) => {
  console.log("in getting by using the id   ");
  try {
    const { _id } = req.body;

    const user = await userService.byid(_id);

    res.status(201).send({ user });
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ message: error.message });
  }
};
