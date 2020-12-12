const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const dotenv = require('dotenv');
const routes = require('./routes');
const db = require('./entity');

dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/',(req,res)=>{res.send("SMS API")});

app.use('/api',routes);

const port = process.env.PORT || 5000 ;

db.sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`listening on port ${port}`);
     }) 
});








