var trainInfo = {
    station_train_code: 'Z8614(楚雄-昆明)',
    train_no: '8c000Z861401'
};
var stationTrainCodeReg = /([a-zA-Z]?[0-9]+)\(([\u4e00-\u9fa5]+)-([\u4e00-\u9fa5]+)\)/;
var infos = stationTrainCodeReg.exec(trainInfo.station_train_code);
if (infos != null) {
    console.log({
        trainCode: infos[1],
        stationBegin: infos[2],
        stationEnd: infos[3],
        trainNo: trainInfo.train_no
    });
}
