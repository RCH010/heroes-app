import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter"

describe('Tests in <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };

    test('should display login if not authenticated', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    })

    test('should display marvel component if authenticated', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                name:'Raul',
                logged: true
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect(wrapper.find('.navbar').exists()).toBe(true);
    })
    
    
})
