const express= require ('express');
const bodyParser= require('body-parser');

const controller=require("./controller")

const app= express();

app.use (bodyParser.json () );

app.get("/api/quotes", controller.quotesView)
app.post("/api/quotes", controller.quotees)
app.delete('/api/quotes/:id', controller.quoteDelete )
app.put('/api/quotes/:id', controller.editQuote)



const port= 3001;



app.listen (port, () => { console.log(`Server listening on port ${port}`)});