const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : [true, 'please enter an email'],
        unique : true,
        lowercase : true,
        validate : [isEmail , 'please enter valid email']
    },
    password:{
        type : String,
        required : [true, 'please enter password'],
        minlength:[6, 'minimum password lenght is 6 characters']

    }
})

// fire a function after creat and  save db

// userSchema.post('save', function(doc,next){
//     console.log('a new user created & saved to database', doc);
//     next()
// })

// fire a function before creat and  save db

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password  = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function( email,password ){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user',userSchema);
module.exports = User;