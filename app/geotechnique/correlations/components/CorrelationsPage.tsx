'use client';
import { useState } from 'react';

import FormAngleFrottement from './AngleFrottement/FormAngleFrottement';
import ResultatsAngleFrottement from './AngleFrottement/ResultatsAngleFrottement';
import { calculerAngleFrottementResultats, AngleFrottementFormData, AngleFrottementResults } from './AngleFrottement/calculsAngleFrottement';

import FormCohesionND from './CohesionND/FormCohesionND';
import ResultatsCohesionND from './CohesionND/ResultatsCohesionND';
import { calculerCohesionNDResultats, CohesionNDFormData, CohesionNDResults } from './CohesionND/calculsCohesionND';

export default function CorrelationsPage() {
  
  const [activeTab, setActiveTab] = useState<'AngleFrottement' | 'CohesionND'>('AngleFrottement');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  //
  // Angle de Frottement
  //

  const [angleFrottementFormData, setAngleFrottementFormData] = useState<Record<string, string>>({
    correlation: 'Pl', // Default value
    Pl: '',
    Ip: '',
  });

  const [angleFrottementResults, setAngleFrottementResults] = useState<(AngleFrottementResults) | null>(null);

  const handleAngleFrottementChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAngleFrottementFormData({ ...angleFrottementFormData, [name]: value });
    setErrorMessage(null);
    setAngleFrottementResults(null);
  };

  const validateAngleFrottement = () => {
    const { correlation, Pl, Ip } = angleFrottementFormData;

    if (correlation === 'Pl') {
      if (!Pl || Pl.trim() === '' || isNaN(Number(Pl))) {
        setErrorMessage('Veuillez entrer une valeur numérique valide pour Pl.');
        return false;
      }
    } else if (correlation === 'Ip') {
      if (!Ip || Ip.trim() === '' || isNaN(Number(Ip))) {
        setErrorMessage('Veuillez entrer une valeur numérique valide pour Ip.');
        return false;
      }
    } else {
      setErrorMessage('Veuillez sélectionner une corrélation valide.');
      return false;
    }

    // If everything is valid
    setErrorMessage(null);
    return true;
  };

  const handleAngleFrottementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAngleFrottement()) return;

    const data: AngleFrottementFormData = {
      correlation: angleFrottementFormData.correlation,
      Pl: Number(angleFrottementFormData.Pl),
      Ip: Number(angleFrottementFormData.Ip),
    };

    const base = calculerAngleFrottementResultats(data);

    setAngleFrottementResults(base);
  };

  //
  // Cohesion non drainée
  //

  const [cohesionNDFormData, setCohesionNDFormData] = useState<Record<string, string>>({
    correlation: 'Pl1', // Default value
    Pl1: '',
    Pl2: '',
    IC: '',
  });

  const [cohesionNDResults, setCohesionNDResults] = useState<(CohesionNDResults) | null>(null);

  const handleCohesionNDChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCohesionNDFormData({ ...cohesionNDFormData, [name]: value });
    setErrorMessage(null);
    setCohesionNDResults(null);
  };

  const validateCohesionND = () => {
    const { correlation, Pl1, Pl2, IC } = cohesionNDFormData;

    if (correlation === 'Pl1') {
      if (!Pl1 || Pl1.trim() === '' || isNaN(Number(Pl1))) {
        setErrorMessage('Veuillez entrer une valeur numérique valide pour Pl.');
        return false;
      }
    } 
    else if (correlation === 'Pl2') {
      if (!Pl2 || Pl2.trim() === '' || isNaN(Number(Pl2))) {
        setErrorMessage('Veuillez entrer une valeur numérique valide pour Pl.');
        return false;
      }
    } 
    else if (correlation === 'IC') {
      if (!IC || IC.trim() === '' || isNaN(Number(IC))) {
        setErrorMessage('Veuillez entrer une valeur numérique valide pour IC.');
        return false;
      }
    } 
    else {
      setErrorMessage('Veuillez sélectionner une corrélation valide.');
      return false;
    }

    // If everything is valid
    setErrorMessage(null);
    return true;
  };

  const handleCohesionNDSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCohesionND()) return;

    const data: CohesionNDFormData = {
      correlation: cohesionNDFormData.correlation,
      Pl1: Number(cohesionNDFormData.Pl1),
      Pl2: Number(cohesionNDFormData.Pl2),
      IC: Number(cohesionNDFormData.IC),
    };

    const base = calculerCohesionNDResultats(data);

    setCohesionNDResults(base);
  };

  //
  // UI
  //

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 mb-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Corrélations en géotechnique
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        
        <div className='w-full lg:w-1/2'>

          <div className="flex space-x-4 justify-center mb-10">

            <button
              onClick={() => setActiveTab('AngleFrottement')}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-35
              ${activeTab === 'AngleFrottement' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Angle de Frottement
            </button>

            <button
              onClick={() => setActiveTab('CohesionND')}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-35
              ${activeTab === 'CohesionND' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Cohésion non drainée
            </button>

          </div>

          {activeTab === 'AngleFrottement' && (
            <FormAngleFrottement
              formData={angleFrottementFormData}
              onChange={handleAngleFrottementChange}
              onSubmit={handleAngleFrottementSubmit}
              errorMessage={errorMessage}
            />
          )}
          {activeTab === 'CohesionND' && (
            <FormCohesionND
              formData={cohesionNDFormData}
              onChange={handleCohesionNDChange}
              onSubmit={handleCohesionNDSubmit}
              errorMessage={errorMessage}
            />
          )}

        </div>

        <div className="hidden lg:block w-px bg-gray-300"></div>

        {activeTab === 'AngleFrottement' && (
          <div className='w-full lg:w-1/2 min-h-full'>
            <ResultatsAngleFrottement results={angleFrottementResults} formData={angleFrottementFormData}/>
          </div>
        )}
        {activeTab === 'CohesionND' && (
          <div className='w-full lg:w-1/2 min-h-full'>
            <ResultatsCohesionND results={cohesionNDResults} formData={cohesionNDFormData}/>
          </div>
        )}

      </div>

    </main>
  );
}