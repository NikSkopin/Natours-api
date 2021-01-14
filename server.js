const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXEPTION. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection succesful!'));

const app = require('./app');

//start server
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`New App is running on port ${port}...`);
});

// handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION. Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// responding to a SIGTERM signal
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down.');
  server.close(() => {
    console.log('Process terminated!');
  });
});
