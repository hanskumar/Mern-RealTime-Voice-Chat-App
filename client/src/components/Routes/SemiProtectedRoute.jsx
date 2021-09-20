import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SemiProtectedRoute = ({children,...rest}) => {

    const Authstate = useSelector((state) => state.auth);

    console.log("Auth Value from Redux",Authstate)

    const isAuth = true;
    const isActivated = Authstate.isActivated;

    return (

        <Route {...rest}
        
            render={({ location }) => {

                return !isAuth  ? (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: location },
                    }}/>
                )
                : isAuth && !isActivated ?
                (
                    children
                ): (
                    <Redirect to={{
                        pathname: '/rooms',
                        state: { from: location },
                    }}/>
                )
            }}
        ></Route>
    )
}

export default SemiProtectedRoute
