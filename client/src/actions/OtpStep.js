import axiosIntance from '../helpers/axios'
import { sendOtpConstant } from '../constants/constants'
 

export const sendOtp=(phone)=>{

    console.log("ation called:::",phone);

    return async(dispatch) => {

        // dispatch request 


        //api call

        const res = await axiosIntance.post('/sendOtp',{
            ...phone
        });

        if(res.status === 200){

            const {phone,hash} = res.data;
            console.log("API REturn data..",res.data);

            //localStorage.setItem('token',data.accessToken);
            //localStorage.setItem('user', JSON.stringify(data));

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

        console.log(res);

    }
}

export const verfifyOtp= (data)=>{

    return async(dispatch) => {

        // Dispatch action before send request


        //API call
        const res = await axiosIntance.post('/verifyOtp',{
            ...data
        });

        if(res.status === 200){

            // Dispatch Success Case



        } else {

            //Dipatch Failure Case


        }
    }

}