"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataAccess_1 = require("../DataAccess");
var mongoose = DataAccess_1.default.mongooseInstance;
var mongooseConnection = DataAccess_1.default.mongooseConnection;
class UserWorkerModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = mongoose.Schema({
            workerID: Number,
            firstName: String,
            lastName: String,
            dob: String,
            email: String,
            city: String,
            address: String,
            zipcode: String,
            jobTags: String,
            description: String,
            username: String,
            password: String,
            pictureID: Number,
            resume: String,
            savedList: Array,
            appliedList: Array,
            subscribed: Array,
        }, { collection: 'userWorker' });
    }
    createModel() {
        this.model = mongooseConnection.model("userWorker", this.schema);
    }
    //Do some function response here with json here
    retreiveAll(response) {
        var query = this.model.find({});
        query.exec((err, workerArray) => {
            response.json(workerArray);
        });
    }
}
exports.default = UserWorkerModel;
