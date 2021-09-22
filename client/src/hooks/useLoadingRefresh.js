import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { autoLoginConstant } from '../constants/constants'


export function useLoadingRefresh() {

    const baseURL= 'http://localhost:8080/api';
    
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `${baseURL}/refreshToken`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("RESPONSE",data);

                dispatch({
                    type:autoLoginConstant.AUTO_AUTH_SUCCESS,
                    payload:{user:data.user,isAuth:data.auth,isActivated:data.user.activated}
                });    

                setLoading(false);
            } catch (err) {
                console.log("error has come!",err);
                setLoading(false);
            }
        })();
    }, []);

    return { loading };
}
