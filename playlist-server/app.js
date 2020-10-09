const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema1 = require('./schema/schema');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 4000; 
const app = express();


// Connect to mongoDB Cluster
mongoose.connect(process.env.MONGO_CONNECTION_STRING);



// Middleware

app.use('/graphql', graphqlHTTP({
    schema: schema1,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Server is Up and Running on Port ${PORT}`));



app.get('/test', (req,res) => {
    var status = mongoose.connection.readyState;
    console.log(`Mongo Connection Status: ${status}`);
    switch (status) {
        case 0 : res.send('Disconnected')
        break;
        case 1 : res.send('Connected')
        break;
        case 2 : res.send('Connecting...')
        break;
        case 3 : res.send('Disconnecting...')
        break;
    }
})