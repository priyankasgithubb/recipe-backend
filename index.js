const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = 3001;
const API_KEY = 'ed82bc9c2517494abef9c329e52a8de4';

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

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
