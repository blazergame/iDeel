import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import * as cors from "cors";

import DataAccess from './DataAccess';
import JobModel from './model/JobModel';
import UserWorkerModel from './model/UserWorkerModel';
import UserBusinessModel from './model/UserBusinessModel';
// Creates and configures an ExpressJS web server.

class App {
    // ref to Express instance
    public express: express.Application;

    public Job: JobModel;
    public UserWorker: UserWorkerModel;
    public UserBusiness: UserBusinessModel;

    
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();

        this.Job = new JobModel();
        this.UserWorker = new UserWorkerModel();
        this.UserBusiness = new UserBusinessModel();
    }
    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();

        const options:cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: "*",
        preflightContinue: false
    };       
    
    router.use(cors(options));
    router.options("*", cors(options));

        router.get('/', (req,res) =>{
          res.sendFile(path.join(__dirname+'/pages/clientView.html'));
        });

        router.get('/users', (req, res) => {
            res.send("Users here");
        });

        router.get('/users/bUsers', (req, res) => {
            this.UserBusiness.retreiveAll(res);
        });

        router.get('/users/wUsers', (req, res) => {
            this.UserWorker.retreiveAll(res);
        });


        router.get('/users/:id/info', (req, res) => {
            res.send("Goes to the view user page(profile page)");
        });
        router.post('/users/:id', (req, res) => {
            res.send('Adds a user to db');
        });
        router.get('/users/:id', (req, res) => {
            res.send("Get specific user");
        });
        router.delete('/users/:id', (req, res) => {
            res.send("Delete a user given their id");
        });
        router.put('/users/:id/info', (req, res) => {
            res.send("Update user info");
        });

        router.get('/dashboard', (req, res) => {
            res.send("DashBoard here");
        });

        router.get('/api/jobs', (req, res) => {
           this.Job.retreiveAll(res);
        });

        router.get('/dashboard/jobs/:jobid',(req,res) => {
            var id = req.params.jobid;
            
            this.Job.retreiveJob(res, {jobID: id});
        });

        router.post('/api/jobs', (req, res) => {
            //res.sendFile(path.join(__dirname+'/pages/redirect.html'));
            console.log("inside node server");
            console.log(req.body);
            var newJob = req.body;
            this.Job.model.create([newJob],(err)=>{
                if(err){
                    console.log('object creation failed');
                }
            })
            

        });


        // router.get('/users/:id/info', (req, res) => {
        //     res.send("Goes to the view user page(profile page)");
        // });
        // router.post('/users/:id', (req, res) => {
        //     res.send('Adds a user to db');
        // });
        // router.get('/users/:id', (req, res) => {
        //     res.send("Get specific user");
        // });
        // router.delete('/users/:id', (req, res) => {
        //     res.send("Delete a user given their id");
        // });
        // router.put('/users/:id/info', (req, res) => {
        //     res.send("Upate user info");
        // });

        // router.get('/dashboard/jobs/:jobid', (req, res) => {
        //     res.send("Gets the job description page");
        // });        

        // router.post('/dashboard/jobs/:jobid', (req, res) => {
        //     res.send("Creates a job");
        // });

        // router.delete('/dashboard/jobs/:jobid', (req, res) => {
        //     res.send("Creates a job");
        // });

        // router.put('/dashboard/jobs/:jobid', (req, res) => {
        //     res.send("Updates a job");
        // });

        // router.delete('/dashboard/search', (req, res) => {
        //     res.send("Searches a job");
        // });

/////////////////////////////////////////////////////////////////////////////////

        // router.get('/app/list/:listId/count', (req, res) => {
        //     var id = req.params.listId;
        //     console.log('Query single list with id: ' + id);
        //     this.Tasks.retrieveTasksCount(res, {listId: id});
        // });

        // router.post('/app/list/', (req, res) => {
        //     console.log(req.body);
        //     var jsonObj = req.body;
        //     jsonObj.listId = this.idGenerator;
        //     this.Lists.model.create([jsonObj], (err) => {
        //         if (err) {
        //             console.log('object creation failed');
        //         }
        //     });
        //     res.send(this.idGenerator.toString());
        //     this.idGenerator++;
        // });


        // router.get('/app/list/:listId', (req, res) => {
        //     var id = req.params.listId;
        //     console.log('Query single list with id: ' + id);
        //     this.Tasks.retrieveTasksDetails(res, {listId: id});
        // });

        // router.get('/app/list/', (req, res) => {
        //     console.log('Query All list');
        //     this.Lists.retrieveAllLists(res);
        // });
        this.express.use('/', router);
        this.express.use('/app/json/', express.static(__dirname + '/app/json'));
        this.express.use('/images', express.static(__dirname + '/img'));
        this.express.use('/', express.static(__dirname + '/pages'));
        this.express.use('/', express.static(__dirname+'/dist'));
    }
}
export default new App().express;