import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import router from './routes/ruleRoutes.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/rules',router);


const CONNECTION_URL='mongodb+srv://Aradhyapb:Aradhyapb6360@cluster0.uadr2z0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {})
.then(() => app.listen(PORT,() =>console.log(`server is running on port ${PORT}`)))
.catch((err) => console.log(err.message));

