import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Tests in <SearchScreen />', () => {
    
    const history = {
        push: jest.fn()
    };

    test('should display correctly with default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a Hero!');
    })

    test('should textfield have input with value from query string', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper.find('HeroCard').exists()).toBe(true);
    })
    
    test('should display alert class if hero doesnt exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batmanSuperman']}>
                <Route path='/search' component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with batmanSuperman');
    })
    
    test('should call pushHistory when input recieved', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batmanSuperman']}>
                <Route path='/search' component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'heroSearched',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({preventDefault(){}});
        expect(history.push).toHaveBeenCalledWith('?q=batman')
    })
    
})
