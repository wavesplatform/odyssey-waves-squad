// extraInfoController.js
extraInfoRep = require('../repository/extraInfoRepository')

CreateExtraInfoRequsetModel = require('../models/api/extrainfo/CreateExtraInfoResponce');
ExtraInfoResponceModel = require('../models/api/extrainfo/GetExtrainfoResponce');

async function create (req, res) {
    var extraInfo = req.body;

    console.log("api extraInfo create");
    try {
        await extraInfoRep.createExtraInfo(extraInfo);
        res.json({
                message: 'New ExtraInfo created!',
                data: extraInfo
        });
    }
    catch (e) {
        res.json(e);
    }
};

async function index (req, res) {
    try {
        console.log("api extraInfo index");
        var extraInfo = await extraInfoRep.getExtraInfo();
        res.json({
            status: "success",
            message: "ExtraInfo retrieved successfully",
            data: extraInfo
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function view (req, res) {
    try {
        console.log("api extraInfo view");
        var extraInfoId = req.params.extraInfo_id
        var extraInfo = await extraInfoRep.findExtraInfoById(extraInfoId);
        res.json({
            status: "success",
            message: "ExtraInfo details successfully",
            data: extraInfo
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
