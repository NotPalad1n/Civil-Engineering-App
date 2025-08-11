'use client';
import { useState } from 'react';

import FormAngleFrottement from './AngleFrottement/FormAngleFrottement';
import ResultatsAngleFrottement from './AngleFrottement/ResultatsAngleFrottement';
import { calculerAngleFrottementResultats, AngleFrottementFormData, AngleFrottementResults } from './AngleFrottement/calculsAngleFrottement';

import FormDalle from './Dim/FormDalle';
import ResultatsDalle from './Dim/ResultatsDalle';
import { calculerBaseResultats, FormData, BaseResults } from './Dim/calculs';

import { suggererArmatures } from './armatures';

export default function CorrelationsPage() {
  
  const [activeTab, setActiveTab] = useState<'AngleFrottement' | 'dim'>('AngleFrottement');
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
  // Dimentionnement
  //

  const [formData, setFormData] = useState<Record<string, string>>({
    longueur: '',
    largeur: '',
    epaisseur: '',
    fissuration: 'peu nuisible',
    Pu: '',
    Pser: '',
    fc28: '',
    fe: '500',
  });

  const [results, setResults] = useState<(BaseResults & { suggestion: string }) | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(null);
    setResults(null);
  };

  const validate = () => {
    const requiredFields = [
      'longueur',
      'largeur',
      'epaisseur',
      'Pu',
      'fc28',
      'fe',
    ];
    for (const key of requiredFields) {
      const value = formData[key];
      if (!value || value.trim() === '' || isNaN(Number(value))) {
        setErrorMessage('Tous les champs doivent être remplis avec des nombres valides.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data: FormData = {
      longueur: Number(formData.longueur),
      largeur: Number(formData.largeur),
      epaisseur: Number(formData.epaisseur),
      fissuration: formData.fissuration,
      Pu: Number(formData.Pu),
      Pser: Number(formData.Pser),
      fc28: Number(formData.fc28),
      fe: Number(formData.fe),
    };

    const base = calculerBaseResultats(data);
    const suggestion = suggererArmatures(0, data.largeur, data.longueur); // base.As, data.largeur, data.longueur

    setResults({ ...base, suggestion });
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
              onClick={() => setActiveTab('dim')}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-35
              ${activeTab === 'dim' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Dimensionnement
            </button>

          </div>

          {activeTab === 'dim' && (
            <FormDalle
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              errorMessage={errorMessage}
            />
          )}
          {activeTab === 'AngleFrottement' && (
            <FormAngleFrottement
              formData={angleFrottementFormData}
              onChange={handleAngleFrottementChange}
              onSubmit={handleAngleFrottementSubmit}
              errorMessage={errorMessage}
            />
          )}

        </div>

        <div className="hidden lg:block w-px bg-gray-300"></div>

        {activeTab === 'dim' && (
          <div className='w-full lg:w-1/2 min-h-full'>
            <ResultatsDalle results={results} />
          </div>
        )}
        {activeTab === 'AngleFrottement' && (
          <div className='w-full lg:w-1/2 min-h-full'>
            <ResultatsAngleFrottement results={angleFrottementResults} formData={angleFrottementFormData}/>
          </div>
        )}

      </div>

    </main>
  );
}