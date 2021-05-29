import express from 'express';
import {Server} from 'socket.io';
import { createServer } from 'http';
import morgan from 'morgan';
import {Routes} from './controller';
import { SocketController } from './controller/SocketController';

const app = express();
const server = createServer(app);

app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan('dev'));

const io = new Server(server);

io.on('connection', socket => {
  new SocketController(socket);
});

Routes.forEach(i => app.use(i.route, i.controller(io).ctx))

server.listen(process.env.PORT||3000);
