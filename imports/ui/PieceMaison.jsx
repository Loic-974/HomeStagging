import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import PieceMaisonCollection from '../api/PieceMaisonCollection'
import { FormAddTache } from './FormAddTache'
import { Meteor } from 'meteor/meteor'


export const PieceMaison = () => {


    const pieces = useTracker(() => PieceMaisonCollection.find({}).fetch()) // return sous forme d'array les pieces de la 

    const [showTacheForm, setShowTacheForm] = useState(false)
    const [progressTache, setProgressTache] = useState(true)

    function formTacheVisibility(value) {

        setProgressTache(value)

    }

    //-------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------//
    //------------------------------------------------ Methode  ---------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------//

    const removePiece = (_id) => {

        PieceMaisonCollection.remove(_id)
    }


    // IMPOSSIBLE DE METTRE A JOUR dans la COLLECTION Incompréhension ?????
    // Comment mettre à jour un élément du tableau d'un objet de la collection

    const accomplirTache = (item, tache) => {

        console.log('je suis item', item)
        console.log('je suis la tache', tache)

        setProgressTache(!progressTache)


        // PieceMaisonCollection.update(_id,
        //     {
        //         $set: {

        //             "travaux.": [{  // work but replace all the data with this one

        //                 _idTache: tache._idTache,
        //                 tache:tache.tache,
        //                 categorie:tache.categorie,
        //                 progression : progressTache

        //             }]
        //         }
        //     }
        // )

        // Meteor.call('updateTache',item,tache,progressTache)
        let toto = Meteor.call('updateTache', tache)
        console.log(toto)
    }

    //-------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------//
    //------------------------------------------------ Affichage --------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------//

    return (

        <div id='containerPieceMaison'>

            {pieces.map(item => <div key={item._id} className='pieceCard'>

                <h2>{item.nomPiece}</h2>
                <p>La surface de la pièce est de {item.surfacePiece} m²</p>

                <div className='containerTachePiece'>


                    <input type='button'
                        value='Ajouter un travail à faire'
                        onClick={() => setShowTacheForm(!showTacheForm)}
                    />

                    {showTacheForm === true && <FormAddTache _id={item._id} surface={item.surfacePiece}/>}

{/* //-------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------- Liste des taches en cours ---------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------// */}

                    <ul>

                        <h3>Tache en cours</h3>
                        <h4>Travaux</h4>

                        {item.travaux.map(tache =>

                            tache.categorie === 'Travaux' ? (

                                <li key={tache.tache} className='cardPiece'>

                                    {tache.progression === false ? (<p>(tache.tache)</p>) : (<strike>{tache.tache}</strike>)}
                                    <p>Cout : {tache.cout} €</p>



                                    <input type='checkbox'
                                        value={progressTache}
                                        checked={tache.progression}
                                        onChange={() => accomplirTache(item, tache)}

                                    />

                                </li>

                            ) : (null)
                        )}
                        <h4>Décoration</h4>

                        {item.travaux.map(tache =>

                            tache.categorie === 'Décoration' ? (

                                <li key={tache.tache}>

                                    {tache.progression === false ? 

                                    <p>{(tache.tache)} Cout : {tache.cout} €</p>

                                    : (<strike> <p>{(tache.tache)} Cout : {tache.cout} €</p></strike>)}
                                    <input type='checkbox'
                                        value={progressTache}
                                        checked={tache.progression}
                                        onChange={() => accomplirTache(item, tache)}

                                    />

                                </li>
                            ) : (null)
                        )}

                        <h4>Entretien</h4>

                        {item.travaux.map(tache =>

                            tache.categorie === 'Entretien' ? (

                                <li key={tache.tache}>

                                    {tache.progression === false ? (tache.tache) : (<strike>{tache.tache}</strike>)}
                                    <p span='important'>Cout : {tache.cout} €</p>
                                    <input type='checkbox'
                                        value={progressTache}
                                        checked={tache.progression}
                                        onChange={() => accomplirTache(item, tache)}

                                    />

                                </li>
                            ) : (null)
                        )}

                        <input type='button'
                            value='Supprimer les Taches Accomplies'  // A faire 
                            onClick={(e) => alert('yes')}
                        />

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