import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SemiProtectedRoute = ({children,...rest}) => {

    const state = useSelector(state => state.auth);

    /* const isAuth = state.isAuth;
    const isActivated = state.isActivated; */

    const isAuth = true;
    const isActivated = false;

    return (

        <Route {...rest}
        
            render={({ location }) => {

                return !isAuth && !isActivated ? (
                    <Redirect to={{
                        pathname: '/authenticate',
                        state: { from: location },
                    }}/>
                )
                : isAuth && !isActivated ?
                (
                    <Redirect to={{
                        pathname: '/activate',
                        state: { from: location },
                    }}/>
                ): (
                    children
                )
            }}
        ></Route>
    )
}

export default SemiProtectedRoute
