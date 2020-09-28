import React, {useState} from 'react';
import { version } from 'react-dom';
import {Header} from './Header'
import {FormAddPiece} from './FormAddPiece'
import {PieceMaison} from './PieceMaison'
import {FormAddTache} from './FormAddTache'


export const App = () => {

  const [ showForm, setShowForm]= useState(false)

  

  return(
 
      <div id="Container">
        <Header/>     
        
        <input type='button'
               className='buttonFormPiece buttonPopup'
               value='Ajouter une pièce'
               onClick = {() => setShowForm(!showForm)}
                  
        />

        {showForm ===true &&  <FormAddPiece show={showForm}/>}
       
        <PieceMaison/>

      </div>
    
  )

}
