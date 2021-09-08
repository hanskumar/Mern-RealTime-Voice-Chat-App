import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SemiProtectedRoute = ({children,...rest}) => {

    const auth = useSelector(state => state.auth);

    const isAuth = auth.isAuth;
    const isActivated = false;

    return (

        <Route {...rest}
        
            render={({ location }) => {

                return !isAuth ? (
                    <Redirect to={{
                        pathname: '/authenticate',
                        state: { from: location },
                    }}/>
                )
                : isAuth && !isActivated ?
                (
                    children
                ): (
                    <Redirect to ="/rooms"/>
                )
            }}
        ></Route>
    )
}

export default SemiProtectedRoute
