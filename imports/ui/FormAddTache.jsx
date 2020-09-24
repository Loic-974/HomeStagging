import React, { useState } from "react";
import Select from "react-select";
import PieceMaisonCollection from "../api/PieceMaisonCollection";

export const FormAddTache = ({ _id }) => {
  const selectOption = [
    { value: "Travaux", label: "Travaux" },
    { value: "Décoration", label: "Décoration" },
    { value: "Entretien", label: "Entretien" },
  ];

  const idObject = new Meteor.Collection.ObjectID();
  const [tachePiece, setTachePiece] = useState("");
  const [categorieTache, setCategorieTache] = useState(null);
  const [budgetMin, setBudgetMin] = useState("");
  //   const [showTacheForm, setShowTacheForm] = useState(true)

  const submitNewTache = (_id, e) => {
    e.preventDefault();

    if (tachePiece !== "") {
      PieceMaisonCollection.update(_id, {
        $push: {
          travaux: {
            _idTache: idObject,
            tache: tachePiece,
            categorie: categorieTache,
            progression: false,
          },
        },
      });
    }
  };

  function refsInfoMarque(value) {
    console.log(value.value);
    let categorie = value.value;

    if (value != null) {
      setCategorieTache(categorie);
    }
    return categorie;
  }

  return (
    <form onSubmit={(e) => submitNewTache({ _id }, e)}>
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

      <input
        type="text"
        placeholder="Prix unitaire ou M²"
        value={budgetMin}
        onChange={(event) => setBudgetMin(event.currentTarget.value)}
      />

      <input type="submit" value="Ajouter une nouvelle tache" />
    </form>
  );
};
