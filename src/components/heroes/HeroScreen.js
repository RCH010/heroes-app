import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {
    const {heroeId} = useParams();

    // este use memo, hace que se memorice el resultado de la petición
    //   para no volver a hcer el proceso a menos que haya cambiado el param
    const heroInfo = useMemo(() => getHeroById(heroeId), [heroeId]);

    // Check hero exists
    if(!heroInfo) { return <Redirect to='/' />; }
    const {superhero, alter_ego, publisher, first_appearance, characters} = heroInfo;

    const handleReturn = () => {
        if(publisher === 'DC Comics') 
            history.push('./dc');
        else
            history.push('./');
    }
    
    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img 
                    alt={superhero} 
                    className='img-thumbnail animate__animated animate__fadeInLeft'
                    src={`../assets/heroes/${heroeId}.jpg`}  
                />
            </div>
            <div className='col-8'>
                <h1 className='h3'>{superhero}</h1>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><strong>Alter ego:</strong> {alter_ego}</li>
                    <li className='list-group-item'><strong>Publisher:</strong> {publisher}</li>
                    <li className='list-group-item'><strong>First Appearance:</strong> {first_appearance}</li>
                </ul>
                <h2 className='h4'>Characters</h2>
                <p className='px-3'>{characters}</p>
                <button 
                    className='btn btn-outline-info'
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
