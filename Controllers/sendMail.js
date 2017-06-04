'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class sendMail {
    constructor() {
        this.smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: "",
            auth: {
                user: "",
                pass: ""
            }
        });
    }
    sendEmailWorker() {
        var mailOptions = {
            to: '',
            subject: 'Job Application Confirmation',
            text: 'Thank you for applying! You will hear back from the business soon!',
        };
        this.smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                console.log('error');
            }
            else {
                console.log('sent');
            }
        });
    }
    sendEmailBusiness() {
        var mailOptions = {
            to: '',
            subject: 'Job Applicant Confirmation',
            text: 'You have a job seeker that is looking to apply for this job',
        };
        this.smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                console.log('error');
            }
            else {
                console.log('sent');
            }
        });
    }
}
exports.default = sendMail;
