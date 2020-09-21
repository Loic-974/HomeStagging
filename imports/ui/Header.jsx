import React from 'react'


export const Header = () => {

    const menuHeader = {
        link: [
        'Accueil',
        'Ajouter une pièce',
        'Autres'
        ]
    }

    return(

        <nav id='header'>

            <ul>{menuHeader.link.map((li) => <li key={li}>{li}</li>)}</ul>
       
        </nav>



    )




}