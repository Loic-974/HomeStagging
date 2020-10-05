import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import PieceMaisonCollection from "../api/PieceMaisonCollection";

export const FormAddTache = ({ _id, surface, popup}) => {
  const selectOption = [
    { value: "Travaux", label: "Travaux" },
    { value: "Outillage", label: "Outillage" },
    { value: "Décoration", label: "Décoration" },

  ];

  const idObject = new Meteor.Collection.ObjectID();
  const [tachePiece, setTachePiece] = useState("");
  const [categorieTache, setCategorieTache] = useState(null);

  const [budgetTravaux, setBudgetTravaux] = useState(0);

  const [prixUnitaire, setPrixUnitaire] = useState(0)
  const [quantitéDéco, setQuantitéDéco] = useState(0)
  const [coutTotalDeco, setCoutTotalDeco] = useState(0)
  const [coutOutillage, setCoutOutillage] = useState(0)



  const prixTravauxBySurface = (surface, value) => {

    console.log('value = ', value)
    console.log('surface =', surface.surface)
    let prixTotal = (value * surface.surface)

    console.log(prixTotal)

    setBudgetTravaux(prixTotal)

    console.log('budget travaux', budgetTravaux)

    return prixTotal

  }


  function prixTotalDecoration() {

    let prixTotal = (prixUnitaire * quantitéDéco)

    setCoutTotalDeco(prixTotal)

    console.log('prix total deco', prixTotal)

    // return prixTotal

  }

  function closePopup (show) {

    return !show

  }



  //   const [showTacheForm, setShowTacheForm] = useState(true)

  const submitNewTache = (_id, e) => {

    e.preventDefault();

    let cout = 0

    if (categorieTache == 'Travaux') {

      cout = budgetTravaux
      console.log('CoutTotalTravaux', budgetTravaux, 'Mon Cout', cout)

    } else if (categorieTache == 'Décoration') {

      cout = coutTotalDeco
      console.log('CoutTotalDeco', coutTotalDeco, 'Mon Cout', cout)
    } else if (categorieTache == 'Outillage'){
      cout = coutOutillage
    }



    if (tachePiece !== "" && categorieTache !== "") {
      PieceMaisonCollection.update(_id, {
        $push: {
          travaux: {
            // _idTache: idObject,
            tache: tachePiece,
            categorie: categorieTache,
            progression: false,
            cout: cout
          },
        },
      });
    }

    setTachePiece('')
    setCoutTotalDeco(0)
    setBudgetTravaux(0)
    setPrixUnitaire(0)
    setQuantitéDéco(0)
  };

  function refsInfoMarque(value) {

    let categorie = value.value;

    if (value != null) {
      setCategorieTache(categorie);
    }
    console.log(value.value);
    return categorie;
  }

  return (

    <form className="popupAddPiece" onSubmit={(e) => submitNewTache({ _id }, e)}>

      <p> Ajouter une nouvelle Tache </p>

      <input
        type="text"
        placeholder="Entrer une nouvelle tache"
        value={tachePiece}
        onChange={(event) => setTachePiece(event.currentTarget.value)}
      />

      <Select
        placeholder="Categorie de la tâche"
        closeMenuOnSelect
        options={selectOption}
        onChange={(value) => refsInfoMarque(value)}
      />

      {/* // Si catégorie select == travaux alors input visible */}

      {categorieTache === 'Travaux' ? (
        <input
          type="number"
          placeholder="Prix au M²"
          onChange={(event) => prixTravauxBySurface({ surface }, event.currentTarget.value)}
        />

      ) : (null)}

      {categorieTache === 'Décoration' ? (

        <Fragment>
          <input type='number'
            placeholder='Prix Unitaire'
            value={prixUnitaire}
            onChange={(event) => setPrixUnitaire(event.currentTarget.value)}
          />

          <input type='number'
            placeholder="Combien D\'unité"
            value={quantitéDéco}
            onChange={(event) => setQuantitéDéco(event.currentTarget.value)}
            onBlur={prixTotalDecoration}
          />
        </Fragment>

      ) : null}

        {categorieTache === 'Outillage' ? (

          <input type="number"
                 placeholder="Prix unitaire de l'Outil"
                 value={coutOutillage}
                 onChange={(event) => setCoutOutillage(event.currentTarget.value)}
          />
        ) : null}

        <input type="button" value="Fermer" onClick={popup}/>
        <input type="submit" value="Ajouter une nouvelle tache" />

    </form>
  );
};
