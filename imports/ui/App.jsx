import React, {useState} from 'react';
import { version } from 'react-dom';
import {Header} from './Header'
import {FormAddPiece} from './FormAddPiece'
import {PieceMaison} from './PieceMaison'
import {FormAddTache} from './FormAddTache'
import Background from './media/background.jpeg';



export const App = () => {

  const [ showForm, setShowForm]= useState(false)

  

  return(
 
      <div id="Container" style={{backgroundImage:"url("+ {Background} +")" }}>
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
