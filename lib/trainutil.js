const https = require("https");
const util = require("util");
const fs = require("fs");

const api = "https://kyfw.12306.cn/otn/czxx/queryByTrainNo?train_no=%s&from_station_telecode=%s&to_station_telecode=%s&depart_date=%s";

exports.grabTrainFullData = function(info, filePath, trainCode, callback) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var url = util.format(api, info.trainNo, info.fromStationTelecode, info.toStationTelecode, info.departDate);
    var data = "";
    https.get(url, (res) => {

        res.on('data', (d) => {
            // var trainData = eval(d.toString("utf-8"));
            data = data + d.toString("utf-8");
        });
        res.on('end', () => {
            fs.writeFile(filePath, JSON.stringify(JSON.parse(data).data.data), {
                encoding: "utf-8"
            }, (err) => {
                if (err) throw err;
                console.log(trainCode + " saved!");
            });
            if(callback) {
            	callback();
            }
        });
    }).on('error', (e) => {
        console.log(url);
        console.log(data);
        console.error(e);
    });
};
