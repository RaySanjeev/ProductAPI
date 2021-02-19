const dotenv = require('dotenv');

// Adding Environment Variables To Node
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`The Server is listening at port: ${port}`);
});
