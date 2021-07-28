const { mount } = require("enzyme");
const { MemoryRouter, Router } = require("react-router-dom");
const { AuthContext } = require("../../../auth/AuthContext");
const { Navbar } = require("../../../components/ui/Navbar");
const { types } = require("../../../types/types");

describe('Tests in <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Pedrito'
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    afterEach(()=> {
        jest.clearAllMocks();
    })

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe(contextValue.user.name);
    })
    
    test('should call logout and use history', () => {
        // simulate click
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({type:types.logout});
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    })
    
})
