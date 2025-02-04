# hng12-stage001

This is the hng task for the stage 1.

# Number Classification API

This API classifies numbers based on mathematical properties and fetches a fun fact.

## API Endpoint

- **URL:** `GET <your-deployed-url>/api/classify-number?number=371`
- **Response Format (200 OK):**

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### **Error Response (400 Bad Request)**

```json
{
  "number": "alphabet",
  "error": true
}
```

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Axios

## Deployment

This API is hosted on Render.

## Setup Instructions

### **1. Clone this repository:**

```sh
git clone <repo-url>
cd number-classification-api
```

### **2. Install dependencies:**

```sh
npm install
```

### **3. Start the server:**

```sh
npm run dev
```

### **4. Test the API:**

Visit: `http://localhost:3000/api/classify-number?number=371`
