import express from 'express';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.listen(process.env.PORT || 80, () => console.log("Running on port " + process.env.PORT || 80))