
const express = require("express");
const router = express.Router();



const {
    createCard,
    updateCard,
    getSingleCard,
    deleteCard,
    getAllCards
  } = require("../controllers/cardControllers");


router.route("/cards").get(getAllCards); 
router.route("/card/new").post(createCard);
router.route("/card/:id").put(updateCard); 
router.route("/card/:id").get(getSingleCard); 
router.route("/card/:id").delete(deleteCard);


module.exports = router;