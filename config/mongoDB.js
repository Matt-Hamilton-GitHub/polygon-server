const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const MONGO_SPILL_TEA_URI = `mongodb+srv://${process.env.ADMIN_NAME}:${process.env.MANGO_PASSWORD_SPILL_TEA}@spill-the-tea-cluster.bwa61.mongodb.net/?retryWrites=true&w=majority&appName=spill-the-tea-cluster`

const connectMDBtoTeaSpill = async () =>{
    try {
        await mongoose.connect(MONGO_SPILL_TEA_URI)
        console.log('MongoDB Connected succesfully...');
    } catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectMDBtoTeaSpill