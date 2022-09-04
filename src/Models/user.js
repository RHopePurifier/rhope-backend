const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
        firstName: {
            type: String,
            trim: true,
            min: [2, 'Too short, min is 4 characters'],
            max: [32, 'Too long, max is 32 characters']
        },

        lastName: {
            type: String,
            trim: true,
            min: [2, 'Too short, min is 4 characters'],
            max: [32, 'Too long, max is 32 characters']
        },
	},

	email: { 
		type : String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        trim: true,
		unique : true,
        lowercase : true,
        required : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
	},

	password: { 
		type : String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'], 
		required : true
	},

    phoneNo: {
        type: Number,
        min: 10,
        max: 10,
        required : true
    },

    address: {
        loaclity: {
            type: String,
            min: [4, 'Too short, min is 4 characters'],
            max: [32, 'Too long, max is 32 characters'], 
            required : true
        },
        zipCode: {
            type: Number,
            min: 100000,
            max: 999999
        }
    }
	// employees : [{type : Schema.Types.ObjectId, ref : 'Employee'}]

});

module.exports = mongoose.model('User', userSchema);