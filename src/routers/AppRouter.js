import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const {user} = useContext(AuthContext)

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact
                        component={LoginScreen}
                        isAuthenticated={user.logged}
                        path='/login'
                    />
                    {/* <Route exact path='/login' component={LoginScreen} /> */}
                    <PrivateRoute 
                        path='/' 
                        component={DashboardRoutes}
                        isAuthenticated={user.logged}
                    />
                    {/* Aquí este AppRouter es el principal, y en el caso que no sea login
                        se va y carga el DashboardRoutes. Ahí hay un switch que es el que entraría
                        aquí... */}
                </Switch>
            </div>
        </Router>
    )
}
