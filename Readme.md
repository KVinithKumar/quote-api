# Quote API with Rate Limiting

A simple RESTful API that returns a random inspirational quote and applies IP-based rate limiting.

## Live Demo

- API Endpoint: https://quote-api-5s07.onrender.com/api/quote  
- Swagger Docs: https://quote-api-5s07.onrender.com/api-docs

## Tech Stack
- Node.js
- Express.js
- express-rate-limit (for IP-based rate limiting)
- Swagger UI (API documentation)

## How to Run Locally

1. Clone the repository:
use this commands

git clone https://github.com/KVinithKumar/quote-api.git
cd quote-api
<!-- Install dependencies -->
npm install
<!-- Start the server: -->
node index.js
<!-- Open your browser or Postman and test -->
http://localhost:3000/api/quote
