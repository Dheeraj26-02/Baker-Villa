const mongoose = require('mongoose');

const customiseSchema = new mongoose.Schema({
    image:Buffer,
    createdAt: { type: Date, default: Date.now },
    flavour:{type:String, required:true},
    weight:{type:Number, required:true},
    price:{type:Number, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true}
});

module.exports = mongoose.model('customiseCake',customiseSchema);