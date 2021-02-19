const dotenv = require('dotenv');
const mongoose = require('mongoose');

// HANDLING ANY OTHER ASYNC ERRORS
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting Dowm.....');
  console.log(err.name, err.message, err);
  process.exit(1);
});

// Adding Environment Variables To Node
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

const DB = process.env.MONGODB.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database successfully!!');
  });

// Starting the Server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`The Server is listening at port: ${port}`);
});

// HANDLING PROMISE REJECETION
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥. Shutting Down.');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
