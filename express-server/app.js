// ./express-server/app.js
import express from 'express';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import bb from 'express-busboy';




import todoRoutes from './routes/todo.server.route';


const app = express();


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


bb.extend(app);





app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));



const port = process.env.PORT || 3001;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern-todo-app', {
  useMongoClient: true,
});


SourceMapSupport.install();

app.use('/api', todoRoutes);

app.get('/', (req,res) => {
  return res.end('Api working');
})


app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});




app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});
