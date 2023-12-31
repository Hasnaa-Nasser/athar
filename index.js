import express from 'express';
import connect from './database/dbConnection.js';
import countryRouter from './src/modules/countries/countries.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import { AppError } from './src/utils/response.error.js';
import jobRouter from './src/modules/jobs/jobs.routes.js';
import userRouter from './src/modules/user/user.routes.js';
import charityRouter from './src/modules/charity/charity.routes.js';
import convoyRouter from './src/modules/convoys/convoys.routes.js';
import boxRouter from './src/modules/donationBoxes/boxes.routes.js';
import financeRouter from './src/modules/finance/finance.controller.js';
import donateRouter from './src/modules/donate/donate.routes.js';
import authRouter from './src/modules/auth/auth.router.js'
// import {createInvoice} from './src/utils/pdf.js'
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors({
    origin:"*"
}));
app.use(morgan('dev'));
app.use(express.static('uploads'));

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/auth', authRouter)
app.use('/api/countries',countryRouter);
app.use('/api/jobs',jobRouter);
app.use('/api/users' , userRouter);
app.use('/api/charity' , charityRouter);
app.use('/api/convoys' , convoyRouter);
app.use('/api/donation/boxes' , boxRouter);
app.use('/api/finance',financeRouter);
app.use('/api/donate' , donateRouter);
app.all('*',(req , res , next)=>{
    next(new AppError('Not Found' , 404));
});

//Global error
app.use((err , req , res , next)=>{
    res.status(err.statusCode).json({message: err.message});
})

app.listen(port , ()=>{
    console.log('listening on port ' + port);
});

