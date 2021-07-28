import { mount } from "enzyme"
import { AuthContext } from "../../../auth/AuthContext"
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe('Tests in LoginScreen', () => {

    const dispatch = jest.fn();
    const history = {replace: jest.fn()}
    const wrapper = mount(
    <AuthContext.Provider value={{dispatch}}>
        <LoginScreen history={history} />
    </AuthContext.Provider>)

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should call dispatch when loggedin', () => {
        wrapper.find('button').prop('onClick')();
        const actualUser = {
            name: 'Raúl',
            email: 'ra@gm.com'
        };
        const action = {
            type: types.login,
            payload: actualUser
        };
        expect(dispatch).toHaveBeenCalledWith(action);
        expect(history.replace).toHaveBeenCalled();
    })
    
})
