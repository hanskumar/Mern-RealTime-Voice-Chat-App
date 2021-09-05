import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({children,...rest}) => {

    const isAuth = false;

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
