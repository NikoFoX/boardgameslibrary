const express = require('express');
const app = express();

const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient

app.use(new morgan('common'))

MongoClient.connect('mongodb://localhost:27017/boardgameslibrary', { useUnifiedTopology: true }, function (err, client) {
    if (err) throw err

    var db = client.db('boardgameslibrary')
    
    app.get('/', (req, res) => {
        res.send('Initial backend response.');
    });
    
    app.listen(3000, function() {
        console.log('listening on 3000')
    })
})

