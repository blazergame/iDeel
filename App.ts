import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import * as cors from "cors";
import * as nodemailer from 'nodemailer';

import DataAccess from './DataAccess';
import JobModel from './model/JobModel';
import UserWorkerModel from './model/UserWorkerModel';
import UserBusinessModel from './model/UserBusinessModel';

import sendMail from './Controllers/sendMail';

// Creates and configures an ExpressJS web server.

class App {
    // ref to Express instance
    public express: express.Application;

    public Job: JobModel;
    public UserWorker: UserWorkerModel;
    public UserBusiness: UserBusinessModel;
    public mail: sendMail;
    
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();

        this.Job = new JobModel();
        this.UserWorker = new UserWorkerModel();
        this.UserBusiness = new UserBusinessModel();
        this.mail = new sendMail();
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

        router.get('/api/users/bUsers', (req, res) => {
            this.UserBusiness.retreiveAll(res);
        });

        router.get('/api/users/wUsers', (req, res) => {
            this.UserWorker.retreiveAll(res);
        });

        router.get('/api/jobs', (req, res) => {
           this.Job.retreiveAll(res);
        });

        router.get('/api/jobs/:id',(req,res) => {
            var id = req.params.id;  
            this.Job.retreiveJob(res, {'jobID': id});
        });

        router.post('/api/jobs', (req, res) => {
            var newJob = req.body;
            this.Job.model.create([newJob],(err)=>{
                if(err){
                    console.log('object creation failed');
                }
            })
            res.end();       
        });

        //Update on job given jobID as argument
        router.put("/api/jobs/:id", (req,res) => {
            var id = req.params.id;
            this.Job.updateJob(req, res, id);
        });

        //Delete one job given jobID as argument
        router.delete("/api/jobs/:id", (req,res) => {
            var id = req.params.id;
            console.log(id);
           this.Job.deleteJob(res, id);
        });
        
        router.get('/api/sendWorker', (req,res) => {
            this.mail.sendEmailWorker();
        });

        router.get('/api/sendBusiness', (req,res) => {     
            this.mail.sendEmailBusiness();    
        });

        this.express.use('/', router);
        this.express.use('/', express.static(__dirname+'/dist'));
    }
}
export default new App().express;