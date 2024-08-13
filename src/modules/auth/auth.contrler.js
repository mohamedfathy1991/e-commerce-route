import { User } from "../../../database/model/user.model.js"
import bcrypt from "bcrypt"
import joi from "joi"
import { generateOTP } from "../../mail/generatCode.js"
import { sendmail } from "../../mail/sendMail.js"
import { AppErr } from "../../midleware/catcherr.js"
import { generatToken } from "../../midleware/tokenOperation.js"


 
/**
 * @access /auth/signup
 * @desc sending acount information to make signup 
 * and send otp to email to confirm account
 
 */
export const signup = ( async (req,res,next)=>{
      let {email,password}= req.body
      let userfound= await User.findOne({email})
      if (userfound) return next(new AppErr('email is used',409))

      let user=   new User(req.body)

      user.otp = await generateOTP(1000,10000)
      user.otpExpaire=  new Date(Date.now() + 5*60*1000 )
      await user.save()
   
      // send email
       await  sendmail(user.email,user.name,user.otp)

      
      res.json({message:"success pls comfirm email" })
})
/** 
 *@access /auth/verfy
 *@desc verify account by otp
*/
export const verfyemail=async(req,res,next)=>{
      let {email,otp}= req.body
      let user= await User.findOne({email})
      
      if (!user) return next(new AppErr('user not found',403))
      
      if (user.otp != otp) return next(new AppErr('opt is wrong',403))
      if( user.otpExpaire < (new Date(Date.now())))return next(new AppErr('otp is expired'))
         await User.findOneAndUpdate({email},{
            confirm:true,
            $unset: { otp: "", otpExpaire: "" }
            

      })
      
      res.json({message:"success  email confirmee" })

}

export const sinin=async(req,res,next)=>{

      let {login,password}= req.body
      let user;
      if (joi.string().pattern(/^01[0-9]{9}$/).validate(login).error == null) {
            user = await User.findOne({phone:login })

      }else{
            // search by email or recoveremail
            user = await User.findOne({email:login}) || await User.findOne({recoverEmail:login})

      }
      if (!user) return next(new AppErr('user not found',404))
      if (!user.confirm) return next(new AppErr('email not verified',403))
            console.log(user);
            console.log(password,user.password);
      let checkpassword= bcrypt.compareSync(password,user.password)
      console.log(checkpassword)
      if (!checkpassword) return next(new AppErr('password is wrong',403))
      // change status of account

let token= generatToken({ email: user.email,role:user.role ,id: user._id ,name:user.name})
res.json({token, message: "success" })

      

}

export const changepassword=async(req,res,next)=>{
      let{id}=req.params
      let {newpassword,oldpassword}= req.body
      if(req.user.id!=id) return(next(new AppErr('not authorize ',402)))
      let user= await User.findById(id)
    let checkpassword= bcrypt.compareSync(oldpassword,user.password)
      
    
      if(!checkpassword) return(next(new AppErr(' old password incorect ',403)))
      user.password= newpassword
       user.passwordChangedAt=Date.now()      
      await user.save()
      res.json({message:"success",password:"updated" })

}
export const forgetPasswordfun=async(req,res,next)=>{
      let {email}=req.params
      let user= await User.findOne({email})
      if(!user) return next(new AppErr('email not found',404))
      user.otp = await generateOTP(1000,10000)
      user.otpExpaire=  new Date(Date.now() + 5*60*1000 ) 
      await user.save()
   let userName= user.firstName + user.lastName
      await  sendmail(user.email,userName,user.otp)
      res.status(200).json({message:"success",otp:"send to your email"})


}
export const changePasswordForgetten=async(req,res,next)=>{
      let{email}=req.params
      let {otp,newpassword}=req.body
   
      let user= await User.findOne({email})
      if(!user) return next(new AppErr('email not found',404))
      if(user.otp!=otp) return next(new AppErr('otp is wrong',403))
      user.otp=undefined
      user.otpExpaire=undefined
      await user.save()
      res.json({message:"success",password:"updated" })

}