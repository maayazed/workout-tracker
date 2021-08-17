const express = require('express');
const mongoose = require('mongoose');
const api = require('./api/actAPI');
const routes = require('./routes/landRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(api);
app.use(routes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});