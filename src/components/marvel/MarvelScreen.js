import React from 'react'
import HeroList from '../heroes/HeroList'

export const MarvelScreen = () => {
    return (
        <div>
            <h1>Marvel</h1>
            <br/>
            <HeroList publisher='Marvel Comics'/>
        </div>
    )
}
