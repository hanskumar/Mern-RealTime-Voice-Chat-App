import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {useSelector,useDispatch } from 'react-redux'

const GuestRoute = ({children,...rest}) => {

    const userState = useSelector((state) => state.auth);

    const isAuth = userState.isAuth;

    return (

        <Route {...rest}
        
            render={({ location }) => {

                return isAuth ? (
                    <Redirect
                            to={{
                                pathname: '/rooms',
                                state: { from: location },
                            }}
                    />
                )
                :
                (
                    children
                );
            }}
        ></Route>
    )
}

export default GuestRoute
