import React from 'react';
import { mount } from "enzyme"
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Tests in <PrivateRoute/>', () => {

    const args = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('should display component if authenticated and save in localstorage', () => {
        //usamos el HighOrderComponetn MemoryRouter, para poder probar estas cosas de las rutas
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ true }
                    component={() => <span>Listo</span>}
                    {...args}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
    })

    test('should block component if is not authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component={() => <span>Listo</span>}
                    {...args}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
    })
    
})
