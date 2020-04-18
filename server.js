const app = require('./app');

//start server
const port = 3000; //TODO env variable or config file for port

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
