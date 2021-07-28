import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import HeroCard from '../heroes/HeroCard';
import queryString from 'query-string'
import { getHeroesByName } from '../../selectors/getHeroesByName';
// para trabajar con query string, existe este paquete
// https://www.npmjs.com/package/query-string
// queryString.parse(location.search)

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ''} = queryString.parse(location.search);

    const [{heroSearched}, handleInputChange, reset ] = useForm({
        heroSearched: q
    });

    const filteredHeroes = useMemo(() => getHeroesByName(q), [q])

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${heroSearched}`);
    }
    return (
        <>
            <h1>Search your Hero</h1>
            <br/>
            <div className='row'>
                <div className='col-5'>
                    <h2 className='h4'>Search Form</h2>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input 
                            type='text'
                            placeholder="Your hero's name"
                            className='form-control'
                            value={heroSearched}
                            name='heroSearched'
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button 
                            className='form-control btn btn-block btn-outline-primary mt-2'
                            type='submit'
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className='col-7'>
                    <h3 className='h4'>Results</h3>
                    <hr />
                    
                    {
                        (q === '') 
                            &&
                            <div className='alert alert-info'>
                                Search a Hero!
                            </div>
                    }
                    {
                        (q !== '' && filteredHeroes.length === 0) 
                            &&
                            <div className='alert alert-danger'>
                                There is no a hero with {q}
                            </div>
                    }
                    {
                        filteredHeroes.map(hero => (
                            <HeroCard 
                                key={hero.id}
                                hero={hero}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
