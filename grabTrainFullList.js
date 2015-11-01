const trainutil = require("./lib/trainutil");
const fs = require("fs");
const pinyin = require("pinyin");
const redis = require("redis");

var date = "2016-02-05";

var client = redis.createClient();

client.on("error", function(err) {
    console.log("Error " + err);
});

process.on("exit", (code) => {
	client.quit();
});

fs.readFile("./data/train_list_v_1.5462.js", (err, data) => {

    eval(data.toString("utf-8"));
    var dates = Object.keys(train_list);
    var firstDateData = train_list[dates[0]];
    Object.keys(firstDateData).forEach((key, index) => {
        firstDateData[key].forEach((ele) => {
            var trainInfos = parseTrain(ele);
            if (trainInfos != null) {
                var trainCode = trainInfos.trainCode;
                console.log("grabing " + trainCode);
                trainutil.grabTrainFullData({
                    trainNo: trainInfos.trainNo,
                    fromStationTelecode: toPinyin(trainInfos.stationBegin),
                    toStationTelecode: toPinyin(trainInfos.stationEnd),
                    departDate: date
                }, "./data/trainlist/" + trainCode, trainCode, function() {

                });
            } else {

            }
        });
    });

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

function getTelecode(client, string) {
    var stationPinyin = pinyin(string, {
        style: pinyin.STYLE_NORMAL
    }).join("");
    client.hget();
    return;
}
