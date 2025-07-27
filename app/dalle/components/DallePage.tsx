'use client';
import { useState } from 'react';
import FormDalle from './Dim/FormDalle';
import FormPreDimDalle from './PreDim/FormPreDimDalle';
import ResultatsDalle from './Dim/ResultatsDalle';
import ResultatsPreDimDalle from './PreDim/ResultatsPreDimDalle';
import { calculerBaseResultats, FormData, BaseResults } from './Dim/calculs';
import { calculerPreDimResultats, PreDimFormData, PreDimResults } from './PreDim/calculsPreDim';
import { suggererArmatures } from './armatures';

export default function DallePage() {
  
  const [activeTab, setActiveTab] = useState<'predim' | 'dim'>('predim');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  //
  // Pre-dimensionnement
  //

  const [preDimFormData, setPreDimFormData] = useState<Record<string, string>>({
    longueur: '',
    largeur: '',
    forme: 'Isolée',
  });

  const [preDimResults, setPreDimResults] = useState<(PreDimResults) | null>(null);

  const handlePreDimChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPreDimFormData({ ...preDimFormData, [name]: value });
    setErrorMessage(null);
    setPreDimResults(null);
  };

  const validatePreDim = () => {
    const requiredFields = [
      'longueur',
    ];
    for (const key of requiredFields) {
      const value = preDimFormData[key];
      if (!value || value.trim() === '' || isNaN(Number(value))) {
        setErrorMessage('Tous les champs doivent être remplis avec des nombres valides.');
        return false;
      }
    }
    return true;
  };

  const handlePreDimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePreDim()) return;

    const data: PreDimFormData = {
      longueur: Number(preDimFormData.longueur),
      largeur: Number(preDimFormData.largeur),
      forme: preDimFormData.forme,
    };

    const base = calculerPreDimResultats(data);

    setPreDimResults(base);
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
        Calcul Béton Armé - Dalle pleine (BAEL 91 mod 99)
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        
        <div className='w-full lg:w-1/2'>

          <div className="flex space-x-4 justify-center mb-10">

            <button
              onClick={() => setActiveTab('predim')}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-35
              ${activeTab === 'predim' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Pré-dimensionnement
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
          {activeTab === 'predim' && (
            <FormPreDimDalle
              formData={preDimFormData}
              onChange={handlePreDimChange}
              onSubmit={handlePreDimSubmit}
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
        {activeTab === 'predim' && (
          <div className='w-full lg:w-1/2 min-h-full'>
            <ResultatsPreDimDalle results={preDimResults} />
          </div>
        )}

      </div>

    </main>
  );
}