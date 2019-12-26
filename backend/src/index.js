const express = require('express');
const app = express();

const morgan = require('morgan');

require('dotenv').config();

//settings
app.set('port', process.env.PORT || 4000);
require('./database');

//static files



//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
const userRouter = require('./routes/user.routes');
app.use('/api/users', userRouter);

const taskRouter = require('./routes/task.routes');
app.use('/api/tasks', taskRouter);

//Start server
app.listen(app.get('port'), () => {
    console.log(`server listening on port ${app.get('port')}`);
});
