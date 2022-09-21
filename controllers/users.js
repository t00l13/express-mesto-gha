const User = require("../models/user.js");
const {NotFoundError} = require("../errors/errors.js");

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
  } catch(err) {
    switch(err.name){
      case "CastError":
        res.status(400).send({message: "Введены некоррктные данные"});
      break;

      case "NotFoundError":
        res.status(404).send({message: "Данные не найдены"});
      break;
    }
    res.status(500).send({message: "Произошла ошибка!"});
     console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
  }
};

module.exports.createUser = async ( req, res) => {
  const {name, about, avatar} = req.body;

  try{
    const user = await User.create({name, about, avatar});
    res.send({data: user});
  } catch(err) {
    switch(err.name){
      case "CastError":
        res.status(400).send({message: "Введены некоррктные данные"});
      break;

      case "NotFoundError":
        res.status(404).send({message: "Данные не найдены"});
      break;
    }
    res.status(500).send({message: "Произошла ошибка!"});
     console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
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
    );
    res.send({data: user});
  } catch(err) {
    res.status(500).send({message: "Произошла ошибка!"});
    switch(err.name){
      case "CastError":
        res.status(400).send({message: "Введены некоррктные данные"});
      break;

      case "NotFoundError":
        res.status(404).send({message: "Данные не найдены"});
      break;
    }
     console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
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
    );
    res.send({data: updateAvatar});
  } catch(err) {
    res.status(500).send({message: "Произошла ошибка!"});
    switch(err.name){
      case "CastError":
        res.status(400).send({message: "Введены некоррктные данные"});
      break;

      case "NotFoundError":
        res.status(404).send({message: "Данные не найдены"});
      break;
    }
     console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
  }
};
