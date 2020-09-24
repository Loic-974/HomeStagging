import React,{useState} from 'react'
import PieceMaisonCollection from '../api/PieceMaisonCollection'



export const FormAddPiece= () => {

    const [nomPiece, setNomPiece] = useState('')
    const [longueur, setLongueur] = useState(Number)
    const [largeur, setLargeur]= useState(Number)
    const surface = (longueur * largeur)

    const submitPiece = (e) => {

        e.preventDefault()

        

        if(nomPiece !=='') {

            PieceMaisonCollection.insert({
                
                nomPiece : nomPiece,
                surfacePiece : surface,
                travaux : []
            })

        }
        
        setNomPiece('')
        
    }

    
    return (
        <div className ='popupAddPiece'>
            
            <h3> Ajouter une nouvelle pièce </h3>

                <form id='addPiece' onSubmit={(e) => submitPiece(e)}>

                    <label>Nom de la Pièce : </label>
                    <input type='text'
                            name='nomPiece'
                            placeholder='Entrer le nom de la piece'
                            value={nomPiece}
                            onChange={(e)=>setNomPiece(e.currentTarget.value)}                 
                    />
                    <label>Longueur de la Pièce : </label>
                    <input type='number'
                            name='longueurPiece'
                            placeholder='Longueur de la piece en centimètre'
                            value={longueur}
                            onChange={(e)=>setLongueur(e.currentTarget.value)}
                    />
                    <label>Largeur de la Pièce : </label>
                    <input type='number'
                            name='longueurPiece'
                            placeholder='Largeur de la piece en centimètre'
                            value={largeur}
                            onChange={(e)=>setLargeur(e.currentTarget.value)}
                    />

                    <input type='submit'
                        value='Soumettre'
                    />

                    


                </form>
        </div>

    )


}