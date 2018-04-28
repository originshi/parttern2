

let { newDataBase,
    newCollection,
    deleteCollection,
    insertData,
    selectData,
    updateData,
    deleteData,
    aggregate } = require("../base/index");

// newDataBase("mydb");
// newCollection("mydb","movie")
// insertData("mydb","movie",{name:'afanda'})
//selectData("mydb","movie",{});
//updateData("mydb","movie",{name:'afanda'},{name:'afanda1'})
//deleteData("mydb","movie",{name:'afanda1'})
let database = {
    dataBase: "mydb", collectionName: "order", data: { price: 10 }, updateData: {}, ismore: false,
    linkcollectionName: "movie", localkey: 'movieid', fromkey: 'movieid', newType: 'orderdetails'
}
//deleteCollection(Object.assign({},database,{collectionName:"order"}));
//insertData(Object.assign({},database,{collectionName:"order",data:{movieid:1,price:2}}))
//updateData(Object.assign({},database,{data:{movieid:1},updateData:{$set:{name:'afanda1'}}}))
// aggregate(Object.assign({},database,{collectionName:"order",linkcollectionName:"movie",
// localkey:"movieid",fromkey:"movieid",newType:"details"}))
//   aggregate(database)
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection('order').aggregate([
        {
            $lookup:
                {
                    from: 'movie',
                    localField: 'movieid',
                    foreignField: 'movieid',
                    as: 'orderdetails'
                }

        },
        { $match: { price: 10 } }
        //{}
    ], function (err, res) {
        if (err) throw err;


        res.each((err, doc) => {
            console.log("找到了", doc)
        })




    });
});

