import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

const userSate = { 
    name: 'lilia',
    email:'lilili@gmail.com',
}

describe('Tests in authReducer', () => {
    test('should return default state', () => {
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    })

    test('should authenticate and place the user name', () => {
        const action = {
            type: types.login,
            payload: userSate
        }
        const state = authReducer({logged: false}, action);
        expect(state).toEqual({
            logged: true,
            ...userSate
        });
    })

    test('should delete user when logout', () => {
        const action = {
            type: types.logout
        }
        const state = authReducer({logged: true, ...userSate}, action);
        expect(state).toEqual({
            logged: false,
        });
    })
})
