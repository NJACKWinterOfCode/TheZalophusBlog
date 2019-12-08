const express=require('express');
const graphqlHttp=require('express-graphql');
const mongoose=require('mongoose');
const logger = require('morgan');


//get graphql resolvers and schema
const graphqlSchema=require('./graphql/schema/index');
const graphqlResolvers=require('./graphql/resolvers/index');


//initialize express
const app = express();

//set all middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//allow header and options method
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);



//connect to mongo database
mongoose.connect(`mongodb+srv://sankha:sankha@cluster0-blgns.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser:true, useUnifiedTopology:true })
.then((res)=>
{
    console.log('mongodb connected');
})
.then(()=> {
  app.listen(8000, ()=>{
    console.log('connected to 8000')
  })
})
.catch((err)=>
{ 
  console.log(err); 
})

