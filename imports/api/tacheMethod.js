import check from 'meteor/check'
import PieceMaisonCollection from './PieceMaisonCollection'



Meteor.methods({

    // 'updateTache'(item,tache,value) {
        'updateTache'(item, tache) {
        // PieceMaisonCollection.update({"travaux._idTache._str":tache._idTache._str },
        //     {
        //         $set: {

        //              "travaux.0.progression": value
                  
        //         }
        //     }
        // )

        PieceMaisonCollection.update(item._id,tache.idTache,
            {
                $set: {

                    "travaux": [{  // work but replace all the data with this one

                        _idTache:tache._idTache ,
                        tache:tache.tache,
                        categorie:tache.categorie,
                        progression : true

                    }]
                }
            }
        )  
        
    }
})