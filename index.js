var util = require("util");
var timeutil = require("./lib/timeutil");

var trainNo = "d2287";

var trainData = require("./data/" + trainNo)

var dateNow = new Date();

var length = trainData.stations.length;

var valid = false;
for (var i = 0; i < length; i++) {
    var st = trainData.stations[i];
    var front = i == 0 ? null : trainData.stations[i - 1];
    var back = i == length - 1 ? null : trainData.stations[i + 1];
    var onTheStation = timeutil.duringTimes(dateNow, st.arrive, st.depart);

    if (onTheStation) {
        if (back == null) {
            print(util.format("列车当前已到达终点 %s 站", st.name));
        } else {
            print(util.format("列车当前在 %s 站，到达 %s ，发车 %s ，下一站 %s", st.name, st.arrive, st.depart, back.name));
        }
        valid = true;
        break;
    } else {
        var onTheWay = timeutil.duringTimes(dateNow, front === null ? "00:00" : front.depart, back === null ? "23:59" : back.arrive);
        if (onTheWay) {
            print(util.format("列车正在行驶中，已于 %s 离开 %s，将在 %s 到达 %s", front.depart, front.name, back.arrive, back.name));
            valid = true;
            break;
        }
    }

}

if (!valid) {
    console.log("你确定查的是" + trainNo + "么？");
}


function print(info) {
    console.log("查询车次 " + trainNo);
    console.log(info);
}
