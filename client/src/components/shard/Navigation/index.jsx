import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useSelector,useDispatch } from 'react-redux'
import axiosIntance from '../../../helpers/axios'
import { logoutConstatnt } from '../../../constants/constants'

const Navigation = () => {

    const auth  = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    async function logout(){

        try {
            // API CAll
            const res  = await axiosIntance.post('/logout');
            console.log("Logout REsponse:",res);

            if(res.status === 200){

                //const { user } = res.data;
               
                dispatch({
                    type:logoutConstatnt.USER_LOGOUT_SUCCESS,
                    payload:{user:res.data.user,isAuth:res.data.auth}
                }); 
    
            } else {
                console.log("Error");
                dispatch({
                    type:logoutConstatnt.USER_LOGOUT_FAILURE,
                    payload:{error:"error"}
                }); 
            }

        } catch (err) {
            console.log(err);
        }
    }

    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>MVCP</span>
            </Link>
            {auth.isAuth && (
                <div className={styles.navRight}>
                    <h3>{auth.user.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                auth.user.avatar
                                    ? auth.user.avatar
                                    : '/images/monkey-avatar.png'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logout}
                    >
                        <img src="/images/logout.png" alt="logout" />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navigation;