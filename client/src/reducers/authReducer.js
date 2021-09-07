import { sendOtpConstant } from '../constants/constants'


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
    }
    return state;

}