const mongoose = require('mongoose')
// const uri = 'mongodb+srv://' +
//     'sathwikacharya61:' +
//     encodeURIComponent('Sathwik@6360') + 
//     '@testdb.lkfoghr.mongodb.net/?retryWrites=true&w=majority';
// const uri = `mongodb+srv://ubuntu6360:` +
//     `${encodeURIComponent('Sathwik@6360')}` +
//     `@testdb.lkfoghr.mongodb.net/?retryWrites=true&w=majority`;
//   const uri=  `mongodb+srv://ubuntu6360:Sathwik@6360@cluster1.nk68wj4.mongodb.net/?retryWrites=true&w=majority`
const uri = 'mongodb+srv://ubuntu6360:Sathwik%406360@cluster1.nk68wj4.mongodb.net/testdb?retryWrites=true&w=majority';

    // mongodb+srv://sathwikacharya61:<password>@testdb.lkfoghr.mongodb.net/?retryWrites=true&w=majority
    mongoose.connect(uri).then(()=>{
    console.log(" - -> Connected")
})
.catch((e)=>{
    console.log(e);
})



const userSchema = new mongoose.Schema({
    name:String,
    usn:String,
    phone:Number,
    email:String,
    uid:String,
    attendence:String
});

const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;