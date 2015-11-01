var fs = require("fs");
var redis = require("redis");


console.log("Start parse train list ...");

fs.readFile("./data/train_list_v_1.5462.js", (err, data) => {

    var client = redis.createClient();

    client.on("error", function(err) {
        console.log("Error " + err);
    });

    eval(data.toString("utf-8"));
    var dates = Object.keys(train_list);
    // console.log("Contain dates: " + dates);
    var firstDateData = train_list[dates[0]];
    var count = 0;
    Object.keys(firstDateData).forEach((key, index) => {
        firstDateData[key].forEach((ele) => {
            var trainInfos = parseTrain(ele);
            if (trainInfos != null) {
                client.hmset("train:" + trainInfos.trainCode, trainInfos);
                //console.log(++count);
            } else {
                // console.log(ele);
            }
            console.log(ele);
        });
    });

    client.quit();
    console.log("End parse train list.");
});

function parseTrain(trainInfo) {
    var stationTrainCodeReg = /([a-zA-Z]?[0-9]+)\(([\u4e00-\u9fa5\s]+)-([\u4e00-\u9fa5\s]+)\)/;
    var infos = stationTrainCodeReg.exec(trainInfo.station_train_code);
    if (infos != null) {
        return {
            trainCode: infos[1],
            stationBegin: infos[2],
            stationEnd: infos[3],
            trainNo: trainInfo.train_no
        };
    }
    return null;
}
