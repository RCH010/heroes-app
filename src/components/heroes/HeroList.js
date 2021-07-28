import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getHeroByPublisher } from '../../selectors/getHeroByPublisher'
import HeroCard from './HeroCard';

export const HeroList = ({publisher}) => {
    // este use memo, hace que se memorice el resultado de la petición
    //   para no volver a hcer el proceso a menos que haya cambiado el param
    const heroes = useMemo(() => getHeroByPublisher(publisher), [publisher]);

    return (
        <div className='card-columns animate__animated animate__fadeIn'>
            {
                heroes.map( (hero) => (
                    <HeroCard key = {hero.id} hero= {hero} />
                ))
            }
        </div>
    )
}

HeroList.propTypes = {
    publisher: PropTypes.string.isRequired
}

export default HeroList
