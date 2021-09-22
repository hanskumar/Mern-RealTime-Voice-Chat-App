import axiosIntance from '../helpers/axios'
import { sendOtpConstant } from '../constants/constants'
import { verIfyOtpConstant } from '../constants/constants'
 

export const sendOtp=(phone)=>{

    return async(dispatch) => {

        // dispatch request 


        //api call

        const res = await axiosIntance.post('/sendOtp',{
            ...phone
        });

        try {

            if(res.status === 200){

                const {phone,hash} = res.data;
                //console.log("API REturn data..",res.data);
    
                dispatch({
                    type:sendOtpConstant.OTP_SEND_SUCCESS,
                    payload:{phone,hash}
                });
    
            } else {
    
                dispatch({
                    type:sendOtpConstant.OTP_SEND_FAILURE,
                    payload:{error:res.data.err}
                });
            }

        } catch (err){
            console.log(err);
            dispatch({
                type:sendOtpConstant.OTP_SEND_FAILURE,
                payload:{error:res.data.err}
            });
        }
    }
}

export const verfifyOtp= (frmdata)=>{

    return async(dispatch) => {

        // Dispatch before send request

        try {
            //API call
            const res = await axiosIntance.post('/verifyOtp',{...frmdata});
            
            if(res.status === 200){
    
                //const { data } = res.data;

                console.log("Verify OTP respononse",res.data);

                dispatch({
                    type:verIfyOtpConstant.OTP_VERIFICATION_SUCCESS,
                    payload:{user:res.data.user,isAuth:res.data.auth,isActivated:res.data.user.activated}
                });
    
            } else {
    
                dispatch({
                    type:verIfyOtpConstant.OTP_VERIFICATION_FAILURE,
                    payload:{error:res.data.err}
                });
            }
        
        } catch(err){
            dispatch({
                type:verIfyOtpConstant.OTP_VERIFICATION_FAILURE,
                payload:{error:err}
            });
        }
    }

}