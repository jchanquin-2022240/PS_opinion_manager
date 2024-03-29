import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import publicationRoutes from '../src/publications/publication.routes.js';
import { dbConnection } from './mongo.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = "/comments/v1/auth";
        this.userPath = "/comments/v1/user";
        this.publicationPath = "/comments/v1/publication";
     
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.publicationPath, publicationRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running and listening to port:', this.port)
        });
    }   
}

export default Server;