import app from './app.js';
const PORT = process.env.PORT || 3001; // Change the port to 3001 or any other available port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
