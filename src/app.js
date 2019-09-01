const express = require('express');
const app = express();
const port = 3000;

app.use("/ideas", express.static('docs'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))