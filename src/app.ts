import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    private

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    private connectToTheDatabase() {
        mongoose.connect(`mongodb://localhost/typescript-rest`, { useNewUrlParser: true });
    }
}

export default App;