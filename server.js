import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { static as expressStatic } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(expressStatic(join(__dirname, 'dist')));

app.get('/*', function (req, res) {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/weather-app/`);
});
