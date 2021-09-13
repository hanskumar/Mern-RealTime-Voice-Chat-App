import { sendOtpConstant } from '../constants/constants'
import { verIfyOtpConstant } from '../constants/constants'
import {accountActivationConstant} from '../constants/constants'
import { avatarConstant } from '../constants/constants'

const intialState = {
    token:'',
    user:{
        id:'',
        name:'',
        email:'',
        avatar:'',
        phone:''
    },
    isAuth:false,
    isActivated:false,
    otpStatus:false,
    hash:'',
    phone:'',
    error:'',
    isloading:false
}

export default (state=intialState,action)=>{

    switch(action.type){
        case sendOtpConstant.OTP_SEND_REQUIEST:
            state = {
                ...state,
                isloading:true
            }
            break
        
        case sendOtpConstant.OTP_SEND_FAILURE:
            state = {
                ...state,
                isloading:false,
                error:action.payload.error
            }
            break
        
        case sendOtpConstant.OTP_SEND_SUCCESS:
                state = {
                    ...state,
                    isloading:false,
                    otpStatus:true,
                    phone:action.payload.phone,
                    hash:action.payload.hash
                }
                break   
                
        case verIfyOtpConstant.OTP_VERIFICATION_SUCCESS:
                state = {
                    ...state,
                    isloading:false,
                    otpStatus:true,
                    //user:action.payload.data,
                    isAuth:true,
                    isActivated:true,
                    token:action.payload.token
                }
                break   
                
        case accountActivationConstant.SET_NAME_SUCCESS:

            state = {
                ...state,
                user:{
                    ...state.user,
                    name:action.payload.name
                }
            }
            break   
                
        case avatarConstant.SET_AVATAR_SUCCESS:

            state = {
                ...state,
                user:{
                    ...state.user,
                    avatar:action.payload.avatar
                }
            }
            break         
    }
    return state;

}