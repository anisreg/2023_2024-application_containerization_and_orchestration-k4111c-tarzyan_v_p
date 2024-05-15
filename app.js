const mongoose = require('mongoose');
const mongo = require("./mongo")
const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const path = require('path');
const { count } = require('console');
const schemas = require('./schemas');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.use(express.static(__dirname + '/images'));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/animals');
}

main().then(res => {
    console.log('Подключение к базе данных произошло успешно.')
})

app.get('/', (req, res) => {
    let fileName = 'index.html';
    let options = {
        root: path.join(__dirname)
    };
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.post('/api', async (req, res) => {
    let user = await mongo.getUser(req.body.username)
    if (user) {
        console.log("уже есть")
        res.send(user)
        return
    } else {
        let user = await mongo.createUser(req.body.username)
        let count = await schemas.Animal.estimatedDocumentCount()
        let random = Math.floor(Math.random() * count)

        let randAnimal = await schemas.Animal.find().skip(random);
        let animal = randAnimal[0]

        await schemas.User.findOneAndUpdate(
            { username: req.body.username },
            {
                $set: {
                    animal: {
                        name: animal.Kind,
                        image: animal.Photo,
                        info: animal.Info,
                        cage: animal.CageLocation
                    }
                }
            }
        )
        let uu = await mongo.getUser(req.body.username)
        res.send(uu)
    }
});

app.post('/reset', async (req, res) => {
    let user = await mongo.deleteUser(req.body.username)
    res.send(user)
});