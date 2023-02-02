const express = require("express");
const morgan = require("morgan");
const route = require("./routes");

const app = express();
const port = 3000;

app.use(morgan("combined"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
