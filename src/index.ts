import express, { Request, Response, Application } from "express";
import cors from "cors";
import axios from "axios";
import morgan from "morgan";

const app: Application = express();
const port = process.env.PORT || 3000;

const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));
app.use(cors());
app.use(express.json());

// Function to check if a number is prime
const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num: number): boolean => {
  const digits = num.toString().split("").map(Number);
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(digit, digits.length),
    0
  );
  return sum === num;
};

// Function to check if a number is a perfect number
const isPerfect = (num: number): boolean => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

// Route to classify numbers
app.get(
  "/api/classify-number",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const numberParam = req.query.number as string;
      if (!numberParam) {
        res.status(400).json({ number: null, error: true });
        return;
      }
      const number = parseInt(numberParam, 10);
      const numberDigitSum = Math.abs(number);

      if (isNaN(number)) {
        res.status(400).json({ number: "alphabet", error: true });
        return;
      }

      const properties: string[] = [];
      if (isArmstrong(number)) properties.push("armstrong");
      properties.push(number % 2 === 0 ? "even" : "odd");

      // Fetch fun fact from Numbers API
      const funFactResponse = await axios.get(
        `http://numbersapi.com/${number}/math?json`
      );
      const funFact = funFactResponse.data.text;

      res.status(200).json({
        number,
        is_prime: isPrime(number),
        is_perfect: isPerfect(number),
        properties,
        digit_sum: numberDigitSum
          .toString()
          .split("")
          .reduce((sum, digit) => sum + parseInt(digit, 10), 0),
        fun_fact: funFact
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve fun fact" });
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
