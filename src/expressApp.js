import express from 'express';
import commonRouter from "./routes/users.routes.js"
const app = express();

// Connect to the database
// connectToDatabase();

// Middleware to parse JSON requests
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.use("/",commonRouter);

app.get('/', (req, res) =>{
  res.send("Welcome!! server is running")
});

// Fallback route for non-existing endpoints
app.use('*', (req, res) => {
  return res.status(404).json({
    error: true,
    message: 'API endpoint not found',
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.status || 500).json({
    error: true,
    message: error.message,
  });
});

export default app;
