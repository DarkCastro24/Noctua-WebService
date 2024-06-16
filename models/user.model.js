const Mongoose = require(("mongoose"));
const Schema = Mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre:{
        type: String
    },
    tipo:{
        type: Number
    },
    imagen:{
        type: String    
    },
    hashedPassword: {
        type: String
    },
    salt: {
        type: String
    },
    tokens:{
        type: [String],
        default: []
    },
    num_materias: {
        type: Number,
        default: 0
    },
    cum: {
        type: String,
        default: "0.0"
    },
    materias_interes: [{
        materia: {
            type: String
        },
        promedio:{
            type: String
        },
    }],
},{ timestamps: true});

userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            const _password = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000,64,
                `sha512`,
            ).toString("hex");
            
            return _password;
        } catch (error) {
            debug({error});
            return "";
        }
    },
    makeSalt: function(){
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: function(password){
        return this.hashedPassword === this.encryptPassword(password);
    }
}

userSchema
    .virtual("password")
    .set(function(password = crypto.randomBytes(16).toString()) {
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
});

module.exports = Mongoose.model("User",userSchema);