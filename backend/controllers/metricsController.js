// metricController.js

db = require('../repository/repository')

CreateMetricRequsetModel = require('../models/api/metrics/CreateMetricRequest');
MetricResponceModel = require('../models/api/metrics/GetMetricResponce');

// Handle create claim actions
async function create (req, res) {
    var metrics = new CreateMetricRequsetModel();
    metrics.type=req.body.type ? req.body.type : "default";
    metrics.value=req.body.value ? req.body.value : "0";
    metrics.deviceId=req.body.deviceId ? req.body.deviceId : "0";
    // save the claim and check for errors
    try {
        //var claimId = await db.createUser(contact);
        //claimId.createrId = userId;

        res.json({
                message: 'New metric created!',
                data: metrics
        });
    }
    catch (e) {
        res.json(e);
    }
};

async function index (req, res) {
    try {
        console.log("index");
        //var users = await db.getUsers();
        res.json({
            status: "success",
            message: "Metric retrieved successfully",
            data: [new MetricResponceModel(), new MetricResponceModel()]
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function view (req, res) {
    try {
        console.log("index");
        //var users = await db.getUsers();
        res.json({
            status: "success",
            message: "Metric details successfully",
            data: new MetricResponceModel()
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};


module.exports = {
    index: index,
    create: create,
    view: view
};
