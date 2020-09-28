import check from 'meteor/check'
import PieceMaisonCollection from './PieceMaisonCollection'



Meteor.methods({

    // 'updateTache'(item,tache,value) {
        'updateTache'(tache) {
        // PieceMaisonCollection.update({"travaux._idTache._str":tache._idTache._str },
        //     {
        //         $set: {

        //              "travaux.0.progression": value
                  
        //         }
        //     }
        // )

        PieceMaisonCollection.findOne({travaux: {$elemMatch:{"tache":tache.tache}}})
            
        
    }
})