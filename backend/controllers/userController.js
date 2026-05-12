
import { comparePassword, hashPassword } from '../helpers/userHelper.js'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'


const registerController = async(req,res) => {
    try {
        const {name, email, password} = req.body

        if(!name){
            return res.status(400).send({ message: 'Name is required' });
        }
        if(!email){
            return res.status(400).send({ message: 'email is required' });
        }
        if(!password){
           return res.status(400).send({ message: 'email is required' });
        }

        //check existingUser
        const existingUser = await userModel.findOne({email});
        if(existingUser){
          return res.status(409).send({
            success:false,
            message:'already user please login'
           })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name, email, password:hashedPassword}).save();

        res.status(201).send({
          success: true,
          message: "user register successfully",
          user: {
            name: user.name,
            email: user.email,
          },
        });

        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
        
    }

}

const loginController = async(req,res) => {
    try {
        const {email,password} = req.body;

        //validation
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:'wrong credentials'
            })
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email is not register'
            })
        }

        const match = await comparePassword(password,user.password)
         if(!match){
            return res.status(404).send({
                success:false,
                message:'Invalid password'
            })
        }

        const token = await JWT.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        })
        
    }
    
}

export {registerController,loginController}

