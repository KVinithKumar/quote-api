const express = require('express');
const quotes = require('./quotes');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter middleware (5 requests/min per IP)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: (req, res) => {
    return res.status(429).json({
      error: "Rate limit exceeded. Try again in a few seconds."
    });
  }
});

// Swagger mock setup
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Quote API",
    version: "1.0.0",
    description: "A simple API to get random inspirational quotes"
  },
  paths: {
    "/api/quote": {
      get: {
        summary: "Get a random quote",
        responses: {
          200: {
            description: "A quote is returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    quote: { type: "string" }
                  }
                }
              }
            }
          },
          429: {
            description: "Rate limit exceeded"
          }
        }
      }
    }
  }
};

// Apply rate limiter to quote route
app.use("/api/quote", limiter);

// Endpoint
app.get('/api/quote', (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  console.log(`[${new Date().toISOString()}] IP: ${req.ip} - 200`);
  res.json({ quote: random });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send('Route not found: ' + req.originalUrl);
});

