var redis = require("redis");
var client = redis.createClient();
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var telecode = "";
// async.series([function() {
//     client.on("error", function(err) {
//         console.log("Error " + err);
//     });
//     client.hgetall("station:shanghai",
//         function(err, object) {
//             if (err) {
//                 throw e;
//             }
//             return object.telecode;
//         })

//     client.quit();
// }]);



// async(function() {

//     telecode = await (client.hgetall("station:shanghai",
//         function(err, object) {
//             if (err) {
//                 throw err;
//             }
//             telecode = object.telecode;
//         }));

// });
// 

function a () {
	client.on("error", function(err) {
    console.log("Error " + err);
});
    await (client.hgetall("station:shanghai",
        function(err, object) {
            if (err) {
                throw err;
            }
            // telecode = object.telecode;
            console.log(object.telecode);
            client.quit();
        }));
};

a();
//console.log(telecode);
