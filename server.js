const express = require('express');
const Wish = require('./model/wish');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    Wish.fetchAllWishes(wishesFromFile => {
        console.log(wishesFromFile);
        res.render('index', {myWishes: wishesFromFile});
    });
});

app.post('/wish', (req, res) => {
    let userData = req.body.userWish;
    let newWish = new Wish(userData);
    newWish.saveWish();
    res.redirect('/');
});

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});