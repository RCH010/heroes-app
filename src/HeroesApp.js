import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer';
import { AppRouter } from './routers/AppRouter'

const init = () => {
    // si existen un item en local storage con nombre de user, se regresa ese objeto
    //   sino, se regresa un objeto con logged en falso.
    return JSON.parse(localStorage.getItem('user')) || {logged:false};
}

export const HeroesApp = () => {
    // con este hook de useReducer, se seguira el estado del usuario
    //  usando el authReducer
    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <AuthContext.Provider value={{user, dispatch}}>
            <AppRouter />
        </AuthContext.Provider>
    )
}
