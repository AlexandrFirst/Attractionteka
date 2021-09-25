import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes, RouteNames} from "../routes";

const AppRouter = () => {
    return (
        <Switch>
            {publicRoutes.map(route =>
                <Route
                    {...route}
                    key={route.path}
                />
            )}
            <Redirect to={RouteNames.MAIN}/>
        </Switch>
    );
};

export default AppRouter;