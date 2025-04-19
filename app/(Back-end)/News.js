import NewsAPI from 'newsapi';
import cors from "cors"
import express from "express"

const app = express();
const newsapi = new NewsAPI('7c25db33939141c7a279f8e6d66177a6');

app.use(cors()); // allow cross-origin requests to your server

app.get('/news', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await newsapi.v2.everything({
      q: q,
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk,techcrunch.com',
      language: 'en',
      sortBy: 'relevancy',
    });
    res.send(response.articles)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

app.listen(5000, () => {
  console.log('Server running on 5000');
});
