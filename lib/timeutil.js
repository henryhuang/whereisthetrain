exports.duringTimes = function(dateNow, startStringInclude, endStringExclude) {
    var dateTemp = new Date(0, 0, 0, dateNow.getHours(), dateNow.getMinutes(), 0, 0);
    return dateTemp >= getTime(startStringInclude == null ? "00:00" : startStringInclude) && dateTemp < getTime(endStringExclude == null ? "23:59" : endStringExclude);
}

function getTime(timeString) {
    var ret = null;
    var reg = /(\d+):(\d+)/;
    var match = reg.exec(timeString);
    if (match != null) {
        ret = new Date(0, 0, 0, match[1], match[2], 0, 0);
    }
    return ret;
}
