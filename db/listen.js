const app = require("../app");
const { PORT = 9090 } = process.env;

app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
