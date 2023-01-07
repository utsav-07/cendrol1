const bodyParser = require('body-parser');
const createError =  require('http-errors');
let express =  require('express');
const  mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const path =  require('path');
const cors =  require('cors');

dbConfg =  require('./db/database');


//connection
mongoose.Promise  = global.Promise;
mongoose.connect(dbConfg.db , {
    useNewUrlParser :  true
}).then(() => {
    console.log('Dtabase  connected')
    },
    error => {
        console.log('Database not connected' +  error)
    }

)


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended :  false
}));

app.use(cors());

const userRoute =  require('./routes/user.route')

app.use('/users' ,  userRoute);

const port  = process.env.PORT ||8080;

const server =  app.listen(port , () =>{
    console.log('port connected to: ' + port)
})

app.use((req ,  res , next)=>{
    next(createError(404));
});


app.get('/' , (req ,  res) => {
    res.send('Invalid endpoint');
});


app.use(function(err ,  req , res , next){
    if(!err.statusCode) err.statusCode =  500;
    res.status(err.statusCode).send(err.message);
})