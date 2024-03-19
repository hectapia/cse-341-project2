const express =  require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        next();
})

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
})