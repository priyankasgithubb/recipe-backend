require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const API_KEY = process.env.SPOONACULAR_API_KEY;

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe API!');
});

app.get('/recipes', async (req, res) => {
  const dish = req.query.dish;

  if (!dish) {
    return res.status(400).json({ error: 'dish is required' });
  }

  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: dish,
        apiKey: API_KEY,
        number: 10,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

