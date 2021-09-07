import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const SemiProtectedRoute = ({children,...rest}) => {

    const isAuth = false;
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
