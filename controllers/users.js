const User = require("../models/user.js");
const { NotFoundError } = require("../errors/errors.js");

module.exports.getUsers = async (req,res) => {
  try{
    const users = await User.find({});
    res.send({data: users});
  } catch{
    res.status(500).send({message: "Произошла ошибка!"});
  }
};

module.exports.getUser = async (req, res) => {
  const reqUser = req.params.id;
  try{
    const user = await User.findById(reqUser).orFail(new NotFoundError());
    res.send({data: user});
  } catch (err) {
    let code = 500;
    let msg = "Произошла ошибка";
    switch (err.name) {
      case "CastError":
        code = 400;
        msg = "Введены некорректные данные";
        break;
      case "NotFoundError":
        code = 404;
        msg = "Данные не найдены";
        break;
    }
    res.status(code).send(msg);
  }
};

module.exports.createUser = async ( req, res) => {
  const {name, about, avatar} = req.body;

  try{
    const user = await User.create({name, about, avatar});
    res.send({data: user});
  } catch (err) {
    let code = 500;
    let msg = "Произошла ошибка";
    switch (err.name) {
      case "ValidationError":
        code = 400;
        msg = "Введены некорректные данные";
        break;
    }
    res.status(code).send(msg);
  }
};

module.exports.updateUser = async ( req, res) => {
  const {name, about} = req.body;
  try{
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {name, about},
      {
        new: true,
        runValidators:true,
      }
    ).orFail(new NotFoundError());
    res.send({data: user});
  } catch (err) {
    let code = 500;
    let msg = "Произошла ошибка";
    switch (err.name) {
      case "CastError":
        code = 400;
        msg = "Введены некорректные данные";
        break;
      case "NotFoundError":
        code = 404;
        msg = "Данные не найдены";
        break;
    }
    res.status(code).send(msg);
  }
};

module.exports.updateAvatar = async ( req, res) => {
  const {avatar} = req.body;
  try{
    const updateAvatar = await User.findByIdAndUpdate(
      req.user._id,
      {avatar},
      {
        new: true,
        runValidators:true,
        upsert: false,
      }
    ).orFail(new NotFoundError());
    res.send({data: updateAvatar});
  } catch (err) {
    let code = 500;
    let msg = "Произошла ошибка";
    switch (err.name) {
      case "CastError":
        code = 400;
        msg = "Введены некорректные данные";
        break;
      case "NotFoundError":
        code = 404;
        msg = "Данные не найдены";
        break;
    }
    res.status(code).send(msg);
  }
};
