import React from 'react';
import { mount } from "enzyme"
import { HeroScreen } from "../../../components/heroes/HeroScreen"
import { MemoryRouter, Route } from 'react-router-dom';

describe('Tests in <HeroScreen />', () => {
    
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    };
    
    test('should display redirect component if there is not URL arguments', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock}/>
            </MemoryRouter>
        );
        expect(wrapper.find('Redirect').exists()).toBe(true);
    })
    
    test('should display correctly with an URL argument', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route path='/hero/:heroeId' component={HeroScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should go back with push function to /', () => {
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route 
                    path='/hero/:heroeId' 
                    component={() => <HeroScreen history={historyMock}/>} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(historyMock.push).toHaveBeenCalledWith('./');
    });

    test('should go back with to dc component', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-arrow']}>
                <Route 
                    path='/hero/:heroeId' 
                    component={() => <HeroScreen history={historyMock}/>} 
                />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();
        expect(historyMock.push).toHaveBeenCalledWith('./dc');
    })
    
    test('should call redirect if heroId doesnt exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-arrow12122']}>
                <Route 
                    path='/hero/:heroeId' 
                    component={() => <HeroScreen history={historyMock}/>} 
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
    })
    
})
