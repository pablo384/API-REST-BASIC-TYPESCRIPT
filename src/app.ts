import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀  App listening on the port ${this.port} 🍕`);
        });
    }
    private connectToTheDatabase() {
        mongoose.connect('mongodb://localhost/typescript-rest', { useNewUrlParser: true });
    }
}

export default App;