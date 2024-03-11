const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});


const validateData = (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.validatedData = value;
  next();
};


app.post('/api/users', validateData, (req, res) => {
 

  res.status(201).json({ message: 'Dane zwalidowane i zapisane.' });
});


app.put('/api/users/:id', validateData, (req, res) => {
 

  res.json({ message: 'Dane zwalidowane i zaktualizowane.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});