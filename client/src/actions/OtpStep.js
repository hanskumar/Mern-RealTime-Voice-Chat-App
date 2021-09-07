import axiosIntance from '../helpers/axios'
import constant from '../constants/constants'

export const sendOtp=(phone)=>{

    return async(dispatch) => {

        // dispatch request 


        //api call

        const res = await axiosIntance.post('/sendOtp',{
            ...phone
        });

        console.log(res);

    }


}