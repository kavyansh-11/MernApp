const mongoose=require('mongoose');
// const url="mongodb+srv://kavyansh-11:kavyansh_1234@cluster0.ntqqpj2.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const url="mongodb://kavyansh-11:kavyansh_1234@ac-1dzl6pu-shard-00-00.ntqqpj2.mongodb.net:27017,ac-1dzl6pu-shard-00-01.ntqqpj2.mongodb.net:27017,ac-1dzl6pu-shard-00-02.ntqqpj2.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-34766q-shard-0&authSource=admin&retryWrites=true&w=majority"

const mongoDB= async() => {
    await mongoose.connect(url,{ useNewUrlParser: true }, async (err, result) => {
        if (err) {
            console.log('error');
        }
        else {
            console.log('connected');
            const fetched_data = await mongoose.connection.db.collection('food_items');
            fetched_data.find({}).toArray(async (err, data) => {
                const foodCategory=await mongoose.connection.db.collection('foodCategory');
                foodCategory.find({}).toArray(async (err,catData) => {
                    if (err) {
                        console.log(error + "error");
                    }
                    else {
                        // global can be used anywhere in pacakage
                        global.food_items=data;
                        global.foodCategory=catData;
                        // console.log(global.foodCategory);
                        // console.log(global.food_items);
                    }                    
                });
            });
        }
    });
}

module.exports= mongoDB;


// const mongoDB= async() =>{
//     await mongoose.connect(url, (err,result) => {
//     if(err)
//     {
//         console.log('error');
//     }
//     else{
//         console.log("connected");
//     }

// });
// }