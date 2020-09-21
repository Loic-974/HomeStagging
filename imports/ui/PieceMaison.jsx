import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import PieceMaisonCollection from '../api/PieceMaisonCollection'
import {Mongo} from 'meteor/mongo'


export const PieceMaison = () => {

const idObject = new Meteor.Collection.ObjectID()   
const pieces =  useTracker(() => PieceMaisonCollection.find({}).fetch()) // return sous forme d'array les pieces de la 
const [tachePiece, setTachePiece] = useState('')
const [showTacheForm, setShowTacheForm] = useState(false)
const [progressTache, setProgressTache]= useState(true)

const [budgetMin, setBudgetMin] = useState('')

//-------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ Methode  ---------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------//

const removePiece = (_id) => {

    PieceMaisonCollection.remove(_id)
}

const submitNewTache = (_id,e) => {

    e.preventDefault()

    if(tachePiece !== ''){

        PieceMaisonCollection.update(_id,       
            {
                $push: { travaux : {

                    _idTache: idObject,
                    tache : tachePiece,
                    progression: false
                }}
            },
        )
    }

    setShowTacheForm(!showTacheForm)

    setTachePiece('')
}

// IMPOSSIBLE DE METTRE A JOUR dans la COLLECTION Incompréhension ?????
// Comment mettre à jour un élément du tableau d'un objet de la collection

const accomplirTache = (tache) => {

    for( let i=0; i<pieces.length; i++){

        for (let j=0; j<pieces[i].travaux.length; j++){

            if(pieces[i].travaux[j]._idTache._str === tache._idTache._str){

               setProgressTache(!progressTache)
               pieces[i].travaux[j].progression = progressTache

            //    PieceMaisonCollection.update({_id:tache._idTache, travaux: {$elemMatch: {tache : tache.tache}}},
                // PieceMaisonCollection.update({_id:tache._idTache._str},
                //     {$set:{ 

                //           "travaux.$.progression" : true                                          
                //         }
                //      }                           
                //     )              

                console.log(pieces[i].travaux[j].progression)
            }
        }
    }
}
 
//-------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ Affichage --------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------//

    return(

        <div id='containerPieceMaison'>

           {pieces.map(item => <div key={item._id} id={item._id}>
                    
                <h2>{item.nomPiece}</h2>
                <p>La surface de la pièce est de {item.surfacePiece} m²</p>
            
                <div className='containerPieceMaison'>


                    <input type='button'
                           value='Ajouter un travail à faire'
                           onClick = {() => setShowTacheForm(!showTacheForm)}
                    />

                    { showTacheForm === true && // si showTacheForm return true alors le form est visible

//------------------------------------------------------------------------------------------------------------------------//
// ---------------------------------------- Form ajout de tâche ----------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------//

                    <form onSubmit={(e) => submitNewTache(item._id,e)}> 
                        <input type='text' 
                                placeholder='Entrer une nouvelle tache'
                                value={tachePiece}
                                onChange={(event)=> setTachePiece(event.currentTarget.value)}
                        />

                        <input type='text' 
                                placeholder='Prix unitaire ou M²'
                                value={budgetMin}
                                onChange={(event)=> setBudgetMin(event.currentTarget.value)}
                        />

                        <input type='submit'
                                value='Ajouter une nouvelle tache'
                        />

                    </form>
                    }

{/* //-------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------- Liste des taches en cours ---------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------// */}

                    <ul>

                        <p>Tache en cours</p>

                        {item.travaux.map(tache =>

                        <li key={tache._idTache._str}>
                            
                        {tache.progression === false ? (tache.tache) : (<strike>{tache.tache}</strike>)}
                       
                            <input type='checkbox'
                                    value={progressTache}
                                    onChange={() => accomplirTache(tache)}
                                                    
                            />
  
                        </li>)}
                        
                    </ul>
                
                    
                </div>
            
                <input type='button'
                        value='Delete Piece'
                        onClick={() => removePiece(item._id)}
                    
                />
                        
                
            </div>)}

        </div>

    )



}