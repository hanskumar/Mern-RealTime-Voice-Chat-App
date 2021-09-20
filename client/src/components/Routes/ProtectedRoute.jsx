import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {useDispatch,useSelector } from 'react-redux'

const ProtectedRoute = ({children,...rest}) => {

    const stateData = useSelector(state => state.auth);

    const isAuth = stateData.isAuth;
    const isActivated = stateData.isActivated;;

    console.log("vallue of state",stateData.isActivated);

    return (
        <Route {...rest}
        
            render={({ location }) => {

                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !isActivated ? (

                    <Redirect
                        to={{
                            pathname: '/activate',
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

export default ProtectedRoute
