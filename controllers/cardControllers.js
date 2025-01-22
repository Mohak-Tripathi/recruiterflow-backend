// import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const { v4: uuidv4 } = require('uuid');
// Mock data to simulate a database
let cards = require("../sampledata")
const fs = require('fs');


// Save updated cards to file
// const saveCardsToFile = () => {
//   fs.writeFileSync('../sampledata.js', `module.exports = ${JSON.stringify(cards, null, 2)};`);
// };


const saveCardsToFile = () => {
  const data = JSON.stringify(cards, null, 2);  // Format the JSON properly with indentation
  console.log("Saving cards to file:", data);  // Debug log
  fs.writeFileSync('../sampledata.js', `module.exports = ${data};`, 'utf-8');
};


// Create a new card
exports.createCard = (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      throw new Error("Title and description are required");
    }
    const newCard = { id: uuidv4(), title, description };
    cards.push(newCard);
    saveCardsToFile(); // Save data after deleting a card
    res.status(201).json({ success: true, card: newCard });
  } catch (error) {
    res.status(400).json({ success: false, error: `CreateCardError: ${error.message}` });
  }
};

// Get all cards
exports.getAllCards = (req, res) => {
  try {
    res.status(200).json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ success: false, error: `GetAllCardsError: ${error.message}` });
  }
};

// Get a single card by ID
exports.getSingleCard = (req, res) => {
  try {
    const card = cards.find((card) => card.id === req.params.id);
    if (!card) {
      throw new Error(`Card not found with id: ${req.params.id}`);
    }
    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(404).json({ success: false, error: `GetSingleCardError: ${error.message}` });
  }
};

// Update a card by ID
exports.updateCard = (req, res) => {
  try {
    const card = cards.find((card) => card.id === req.params.id);
    if (!card) {
      throw new Error(`Card not found with id: ${req.params.id}`);
    }
    const { title, description } = req.body;
    card.title = title || card.title;
    card.description = description || card.description;
    saveCardsToFile(); // Save data after deleting a card
    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(400).json({ success: false, error: `UpdateCardError: ${error.message}` });
  }
};

// Delete a card by ID
exports.deleteCard = (req, res) => {
  try {
    const cardIndex = cards.findIndex((card) => card.id === req.params.id);
    if (cardIndex === -1) {
      throw new Error(`Card not found with id: ${req.params.id}`);
    }
    cards.splice(cardIndex, 1);
    saveCardsToFile(); // Save data after deleting a card
    res.status(200).json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, error: `DeleteCardError: ${error.message}` });
  }
};
