import React, {useState, StrictMode} from 'react';
import { version } from 'react-dom';
import {Header} from './Header'
import {FormAddPiece} from './FormAddPiece'
import {PieceMaison} from './PieceMaison'


export const App = () => {

  const [ showForm, setShowForm]= useState(false)

  return(
    <React.StrictMode>
      <div>
        <Header/>     
        
        <input type='button'
               value='Ajouter une pièce'
               onClick = {() => setShowForm(!showForm)}
        />

        {showForm ===true &&  <FormAddPiece/>}
       
        <PieceMaison/>

      </div>
      </React.StrictMode>
  )

}
