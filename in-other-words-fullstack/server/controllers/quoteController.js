import db from '../models/index.js';
const { Quote } = db;


const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
};

const createQuote = async (req, res) => {
  try {
    const { text, author } = req.body;
    const newQuote = await Quote.create({ text, author });
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create quote' });
  }
};

export { getAllQuotes, createQuote };
