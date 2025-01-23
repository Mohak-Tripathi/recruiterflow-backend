



const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Read cards from the JSON file
const getCardsFromFile = () => {
  const data = fs.readFileSync(path.resolve(__dirname, '../sampledata.json'), 'utf8');
  return JSON.parse(data); // Parse the JSON data
};

// Save updated cards to file
const saveCardsToFile = (cards) => {
  const data = JSON.stringify(cards, null, 2);  // Format the JSON properly with indentation
  console.log("Saving cards to file:", data);  // Debug log
  fs.writeFileSync(path.resolve(__dirname, '../sampledata.json'), data, 'utf-8');
};

// Create a new card
const createCard = (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    const cards = getCardsFromFile();  // Get current cards from the JSON file
    const newCard = { id: uuidv4(), title, description };
    cards.push(newCard);

    saveCardsToFile(cards); // Save the updated list of cards to the file

    res.status(201).json({ success: true, card: newCard });
  } catch (error) {
    res.status(400).json({ success: false, error: `CreateCardError: ${error.message}` });
  }
};

// Update card information
const updateCard = (req, res) => {
  try {
    const id = req.params.id
    const {  title, description } = req.body;
    if (!id || !title || !description) {
      throw new Error("ID, title, and description are required");
    }

    const cards = getCardsFromFile();  // Get current cards from the JSON file
    const cardIndex = cards.findIndex((card) => card.id === id);

    if (cardIndex === -1) {
      throw new Error("Card not found");
    }

    // Update the card details
    cards[cardIndex] = { id, title, description };

    saveCardsToFile(cards); // Save the updated list of cards to the file

    res.status(200).json({ success: true, card: cards[cardIndex] });
  } catch (error) {
    res.status(400).json({ success: false, error: `UpdateCardError: ${error.message}` });
  }
};

// Delete a card
const deleteCard = (req, res) => {
  try {
    const { id } = req.params;
  
    if (!id) {
      throw new Error("Card ID is required");
    }

    const cards = getCardsFromFile();  // Get current cards from the JSON file
    const cardIndex = cards.findIndex((card) => card.id === id);

    if (cardIndex === -1) {
      throw new Error("Card not found");
    }

    // Remove the card from the list
    const deletedCard = cards.splice(cardIndex, 1);

    saveCardsToFile(cards); // Save the updated list of cards to the file

    res.status(200).json({ success: true, deletedCard: deletedCard[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: `DeleteCardError: ${error.message}` });
  }
};




// Get all cards
const getAllCards = (req, res) => {
  try {
    const cards = getCardsFromFile();
    res.status(200).json({ success: true, cards });
  } catch (error) {
    res.status(400).json({ success: false, error: `GetAllCardsError: ${error.message}` });
  }
};

// Get a single card by ID
const getSingleCard = (req, res) => {
  try {
    const { id } = req.params;
    const cards = getCardsFromFile();
    const card = cards.find(card => card.id === id);
    if (!card) {
      return res.status(404).json({ success: false, error: 'Card not found' });
    }
    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(400).json({ success: false, error: `GetSingleCardError: ${error.message}` });
  }
};


module.exports = {
  createCard,
  updateCard,
  getSingleCard,
  getAllCards,
  deleteCard
};