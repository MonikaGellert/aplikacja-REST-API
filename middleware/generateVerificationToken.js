import jwt from "jsonwebtoken";

function generateVerificationToken(userId) {
  const secretKey = "my-secret-key";
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: "1h" }); // Generowanie tokena
  return token;
}

export default generateVerificationToken;
