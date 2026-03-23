const express = require('express');
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const reportRoute = require("./routes/report.route")

app.use('/api/auth', authRouter);
app.use('/api/report', reportRoute)



module.exports = app;