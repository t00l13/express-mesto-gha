const Card = require("../models/card.js");

module.exports.getCards = async ( req, res) => {
  try{
    const users = await Card.find({});
    res.send({data: users});
  } catch{
    res.status(500).send({message: "Произошла ошибка!"});
  }
};

module.exports.createCard = async (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;
  try{
    const card = await Card.create({name, link, owner});
    res.send({data: card});
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

module.exports.deleteCard = async (req, res) => {
  const reqCard = req.params.cardId;
  try{
    const card = await Card.findByIdAndRemove(reqCard);
    res.send({data: card});
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

module.exports.likeCard = async (req, res) => {
  try{
    const likes = await Card.findByIdAndUpdate(req.params.cardId, {
      $addToSet: {likes: req.user._id}
    }, {new: true});
    res.send({data: likes});
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

module.exports.dislikeCard = async (req, res) => {
  try{
    const likes = await Card.findByIdAndUpdate(req.params.cardId, {
      $pull: {likes: req.user._id}
    }, {new: true});
    res.send({data: likes});
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
