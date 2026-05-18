import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║  Employee AI System - Backend Server Started  ║
║  🚀 Server running on port ${PORT}              ║
╚════════════════════════════════════════════════╝
  `);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error.message);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
