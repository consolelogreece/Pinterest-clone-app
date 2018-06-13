import express from 'express';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-routes';
import passportSetup from './config/passport-setup'
import cors from 'cors';
import mongoClient from 'mongodb'

dotenv.config();

let db;

mongoClient.connect(process.env.MONGO_URL, (err, database) => {
	if (err) throw err;

	db = database;
	
	app.set('databaseObject', db);
});


const app = express();



app.use(cors());

app.use(helmet());


app.use(bodyParser.json());




//set up routes
app.use('/auth', authRoutes)





// create home route
app.get('/', (req, res) => {
	res.send("home");
})





const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Running on port " + port));