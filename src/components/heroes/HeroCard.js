import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const HeroCard = ({hero}) => {
    const {id, superhero, alter_ego, first_apperance, characters} = hero;
    return (
        <div className='card ms-3' style={{maxWidth: 540}}>
            <div className='row no-gutters'>
                <div className='col-md-4'>
                    <img src={`./assets/heroes/${id}.jpg`} className='card-img'alt={superhero}/>
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h2 className='card-title mb-0 h5'>
                            {superhero}
                        </h2>
                        <hr className='my-1'/>
                        <p className='card-text'>{alter_ego}</p>
                        {
                            (alter_ego !== characters) && <p className='card-text'>{characters}</p>
                        }
                        <p className='card-text'>
                            <small className='text-muted'>{first_apperance}</small>
                        </p>
                        <Link to={`./hero/${id}`}>
                            más...
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

HeroCard.propTypes = {
    hero: PropTypes.object.isRequired
}

export default HeroCard
