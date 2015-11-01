var fs = require("fs");
var redis = require("redis");


console.log("Start parse stations ...");

fs.readFile("./data/station_name_v_1.8397.js", (err, data) => {

    var client = redis.createClient();

    client.on("error", function(err) {
        console.log("Error " + err);
    });

    eval(data.toString("utf-8"));
    var lines = station_names.split("@");
    lines.forEach(function(element, index) {
        if (element.trim()) {
            var cols = element.split("\|");
            try {
                // zzd|郑州东|ZAF|zhengzhoudong|zzd|2532
                // 0  | 1   | 2 |   3         | 4 |  5
                client.hmset("station:" + cols[3], {
                    "indexName": cols[0],
                    "name": cols[1],
                    "telecode": cols[2],
                    "longName": cols[3],
                    "shortName": cols[4],
                    "no": cols[5]
                });
                console.log(element);
            } catch (e) {
                console.log(e);
                console.log(cols);
            }
        }
    });

    client.quit();
    console.log("End parse stations.");
});
