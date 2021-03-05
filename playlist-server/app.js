const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema1 = require('./schema/schema');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 4000; 
const app = express();


// Connect to mongoDB Cluster
mongoose.connect(process.env.MONGO_CONNECTION_STRING);



// Middleware

app.use(cors());            // Adding cors package middleware for development 

app.use('/graphql', graphqlHTTP({
    schema: schema1,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Server is Up and Running on Port ${PORT}`));



app.get('/test', (req,res) => {
    var status = mongoose.connection.readyState;
    console.log(`Mongo Connection Status: ${status}`);
    switch (status) {
        case 0 : res.send('<h2 style="color: red">Disconnected</h2>')
        break;
        case 1 : res.send('<h2 style="color: green">Connected</h2>')
        break;
        case 2 : res.send('<h2 style="color: yellow">Connecting...</h2>')
        break;
        case 3 : res.send('<h2 style="color: yellow">Disconnecting...</h2>')
        break;
    }
})