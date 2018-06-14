import express from 'express';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-routes';
import passportSetup from './config/passport-setup'
import cors from 'cors';
import mongoClient from 'mongodb';
import nodemailer from 'nodemailer';

process.on('warning', e => console.warn(e.stack))

dotenv.config();

const app = express();

let db;

mongoClient.connect(process.env.MONGO_URL, (err, database) => {
	if (err) throw err;

	db = database;
	
	app.set('databaseObject', db);
});


let smtpConfig = {
    host: process.env.SMTP_SERVER_NAME,
    port: process.env.SMTP_SERVER_PORT,
    connectionTimeout:3000,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
};

let transporter = nodemailer.createTransport(smtpConfig)

app.set("transporterObject", transporter)







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