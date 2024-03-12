import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('file'), (req, res) => {
  
  res.send('Plik przesłany pomyślnie!');
});

const dbConnectionURI = process.env.DB_URL;

mongoose.connect(dbConnectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Database connection error:', error);
  process.exit(1);
});

db.once('open', () => {
  console.log('Database connection successful');
  app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`);
  });
});