"use client"
import FormListeElements from "./FormListeElements";
import { useState } from 'react';

export default function DallePage() {
  
  const [elements, setElements] = useState([
  { id: '0', hauteur: '' , color: '#000000', Pl: '', Em: '' }
  ]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    // Do something with the elements, like validation or submission
    console.log(elements);
  };

  //
  // UI
  //

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 mb-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Fondation Superficielle
      </h1>

      <div className="max-w-3xl mx-auto p-6">
        <FormListeElements
          elements={elements}
          setElements={setElements}
          errorMessage={errorMessage ?? undefined}
        />
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-semibold"
      >
        Soumettre
      </button>
    </div>


    </main>
  );
}