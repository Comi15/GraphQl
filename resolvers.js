const { exitCode } = require('process');
const User = require('./models/User.model')
var validator = require('validator')

const resolvers = 
{
    Query: 
    {
        getAllUsers: async () => 
            {
                return await User.find();
                
            }
    },
    Mutation: 
    {
        registerUser: async (parent,args, context,info) => 
            {
                const {name, email} = args.user;
                const user = new User({name,email});
                
                const returnObject = {data:user,message:"Sve ok."}
                if(name === undefined)
                {
                        returnObject.message = "Morate uneti ime da bi ste se registrovali uspesno";
                        returnObject.data.email = "";
                        returnObject.data.name = "";

                        return returnObject;
                }
                if(email === undefined)
                    {
                        returnObject.message = "Morate uneti e-mail da bi ste se registrovali uspesno";
                        returnObject.data.email = "";
                        returnObject.data.name = "";
                        return returnObject;
                    }
                if(validator.isEmail(email))
                {
                    try
                    {

                        await user.save();
                    }
                    catch(error)
                    {
                        returnObject.message = "Neuspesna registracija : " + error.message;

                    }
                }

                else
                {
                    returnObject.message = "Neuspesna registracija : Molim vas unesite e-mail u odgovarajucem formatu";
                }
                return returnObject;
            },
        deleteUser: async (parent,args,context,info) => 
            {
                const { id } = args;
                await User.findByIdAndDelete(id);
                return "Uspesno brisanje";
            }
    }
}
module.exports = resolvers;