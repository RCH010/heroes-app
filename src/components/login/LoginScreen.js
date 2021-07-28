import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'

export const LoginScreen = ({history}) => {

    const {dispatch} = useContext(AuthContext)

    const handleLogin = () => {
        // push, cambia a la pagina, replace sustituye (historia de navegación)
        // history.push('/');
        // history.replace('/');

        const lastPath = localStorage.getItem('lastPath') || '/';


        const actualUser = {
            name: 'Raúl',
            email: 'ra@gm.com'
        };

        const action = {
            type: types.login,
            payload: actualUser
        };
        dispatch(action);
        history.replace(lastPath);
    }

    return (
        <div className='container mt-5'>
            <h1>Login Screen</h1>
            <br/>

            <button
                className= 'btn btn-primary'
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
