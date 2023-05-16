import express, { Express } from 'express';
import 'module-alias/register';
import { config } from 'dotenv';
import morgan from 'morgan';
import passport from 'passport'
import rootRouter from '@/routes/index.route';
import Database from './database/connect.db';
import  './configs/passportFacebook.config'

import session from 'express-session';
import userRouter from '@/routes/user.route'
config();
const PORT_SERVER = process.env.PORT_SERVER || 5000;

const app: Express = express();
// use global middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// connect Database
Database.connect();
app.use('/user', userRouter);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
    cookie: {secure: false}
}));
app.use(passport.initialize());


app.use(`/api/${process.env.CURRENT_API_VERSION as string}`, rootRouter);



app.listen(PORT_SERVER, () =>
    console.log(`App listening on port http://localhost:${PORT_SERVER}`),
);
