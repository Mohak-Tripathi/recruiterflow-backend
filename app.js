/*........................


file:  app.js 

Brief:  Entry point of project.
Project: RecruiterFlow Assignment

Release version: version 1.0.0

Release Date: Jan 22, 2025

Auther: Mohak Tripathi
 ..........................*/

 const express = require("express");
const app = express();
const cors = require("cors");


const dotenv = require("dotenv");


// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }
// ));

app.use(cors({
  origin: '*', // Allow all origins (not recommended in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));




//setting config environemnt file variable-
dotenv.config({ path: "./.env" });

//Handling Uncaught Exceptions 

process.on("uncaughtException", err =>{
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down due to uncaught exception`);
  process.exit(1);   // in this case we don't need to close the server. Just need to come out (exit) from the process.
})


//Set up Security headers => Use Helmet

// app.use(helmet()) //for increasing security. 

//Setting up the body parser
app.use(express.json());

// //Setting cookie parser
// app.use(cookieParser());

// //Set CORS => Accesible by other domains.
// app.use(cors());


//importing all routes
const cards = require("./routes/cardRoutes.js");

app.use("/api/v1/", cards);

// app.all("*", function(req, res, next){
//   next(  route not found`, 404))
// })




// app.use(errorMiddleware);

const PORT = process.env.PORT;

const server = app.listen(8080, '0.0.0.0', () => {
  console.log(
    `Server is listening at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});



//Handling Unhandled Promise Rejection 

process.on("unhandledRejection", err =>{

  console.log(`Error: ${err.stack}`);
  console.log(`Shutting down server due to unhandled promise rejection`);

  server.close(()=>{
    process.exit(1);
  })
})
