import axiosIntance from '../helpers/axios'
import { accountActivationConstant } from '../constants/constants'
import { avatarConstant } from '../constants/constants'


export const setName = (fullname)=>{

    console.log("update name action called:::",fullname);

    return async (dispatch)=> {

        // API CAll
        const res = await axiosIntance.post('/setName',{
            ...fullname
        });

        if(res.status === 200){

            const {data} = res.data;
            console.log("API REturn data..",res.data);

            dispatch({
                type:accountActivationConstant.SET_NAME_SUCCESS,
                payload:{name:data.name}
            }); 

        } else {

            dispatch({
                type:accountActivationConstant.SET_NAME_FAILURE,
                payload:{error:res.data.err}
            }); 
        }
    }
}


export const setAvatar = (imageUrl) =>{

    return async (dispatch)=> {

        const res = await axiosIntance.post('/setAvatar',{
            ...imageUrl
        });

        if(res.status === 200){

            const {data} = res.data;

            dispatch({
                type:avatarConstant.SET_AVATAR_SUCCESS,
                payload:{avatar:data.avatar}
            }); 

        } else {

            dispatch({
                type:avatarConstant.SET_AVATAR_FAILURE,
                payload:{error:res.data.err}
            }); 
        }

    } 
}