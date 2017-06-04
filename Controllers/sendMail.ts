'use strict';
import * as nodemailer from 'nodemailer';

export default class sendMail {

    private smtpTransport;

    public constructor() {
        this.smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: "", // something@gmail.com
            auth: {
                user: "",
                pass: ""
            }
        });    
    }

    public sendEmailWorker():void{

        var mailOptions= {
            to: '', // list of receivers
            subject: 'Job Application Confirmation', // Subject line
            text: 'Thank you for applying! You will hear back from the business soon!', // plain text body
        }

        this.smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                console.log('error');
            } else{
                console.log('sent');
            }            
        });
    }

    public sendEmailBusiness():void{
    
        var mailOptions= {
            to: '', // list of receivers
            subject: 'Job Applicant Confirmation', // Subject line
            text: 'You have a job seeker that is looking to apply for this job', // plain text body
        }

        this.smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                console.log('error');
            } else{
                console.log('sent');
            }            
        });        
    }
    
}