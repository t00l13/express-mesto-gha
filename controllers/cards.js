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
    console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
    res.status(500).send({message: "Произошла ошибка!"});
  }
};

module.exports.deleteCard = async (req, res) => {
  const reqCard = req.params.cardId;
  try{
    const card = await Card.findByIdAndRemove(reqCard);
    res.send({data: card});
  } catch(err) {
    console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
    res.status(500).send({message: "Произошла ошибка!"});
  }
};

module.exports.likeCard = async (req, res) => {
  try{
    const likes = await Card.findByIdAndUpdate(req.params.cardId, {
      $addToSet: {likes: req.user._id}
    }, {new: true});
    res.send({data: likes});
  } catch(err) {
    console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
    res.status(500).send({message: "Произошла ошибка!"});
  }
};

module.exports.dislikeCard = async (req, res) => {
  try{
    const likes = await Card.findByIdAndUpdate(req.params.cardId, {
      $pull: {likes: req.user._id}
    }, {new: true});
    res.send({data: likes});
  } catch(err) {
    console.log(`Произшла ошибка : ${err.name} с сообщением ${err.message}`);
    res.status(500).send({message: "Произошла ошибка!"});
  }
};
