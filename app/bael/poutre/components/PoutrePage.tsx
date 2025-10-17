'use client';
import { useState } from 'react';

import FormPoutre from './Dim/FormPoutre';
import { calculerPreDimResultats, PreDimFormData, PreDimResults } from './PreDim/calculsPreDim';
import ResultatsPreDimPoutre from './PreDim/ResultatsPreDimPoutre'

import FormPreDimPoutre from './PreDim/FormPreDimPoutre';
import { calculerBaseResultats, FormData, BaseResults } from './Dim/calculs';
import ResultatsPoutre from './Dim/ResultatsPoutre';

import FormFerr from '../../Ferr/FormFerr';
import ResultatsFerr from '../../Ferr/ResultatsFerr';
import { calculerFerrResultats, FerrFormData, FerrResults } from '../../Ferr/calculsFerr';

import { suggererArmatures } from './armatures';

export default function PoutrePage() {

  const [activeTab, setActiveTab] = useState<'predim' | 'dim' | 'ferr'>('predim');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //
  // Pre-dimensionnement
  //

  const [preDimFormData, setPreDimFormData] = useState<Record<string, string>>({
    longueur: '',
    forme: 'Isolée',
    chargement: 'CC',
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
      forme: preDimFormData.forme,
      chargement: preDimFormData.chargement,
    };

    const base = calculerPreDimResultats(data);

    setPreDimResults(base);
  };

  //
  // Dimentionnement
  //

  const [formData, setFormData] = useState<Record<string, string>>({
    largeur: '',
    hauteur: '',
    fissuration: 'peu nuisible',
    Mu: '',
    Mser: '',
    Vu: '',
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
      'largeur',
      'hauteur',
      // 'Mu',
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
      largeur: Number(formData.largeur),
      hauteur: Number(formData.hauteur),
      fissuration: formData.fissuration,
      Mu: Number(formData.Mu),
      Mser: Number(formData.Mser),
      Vu: Number(formData.Vu),
      fc28: Number(formData.fc28),
      fe: Number(formData.fe),
    };

    const base = calculerBaseResultats(data);
    const suggestion = suggererArmatures(0, data.largeur, data.hauteur); // base.As, data.largeur, data.longueur

    setResults({ ...base, suggestion });
  };

  //
  // Ferraillage
  //

  const [ferrFormData, setFerrFormData] = useState<Record<string, string>>({
    As: '',
  });

  const [elements, setElements] = useState([
    { id: '0', nombre: '', diametre: '' },
  ]);

  const [ferrResults, setFerrResults] = useState<(FerrResults) | null>(null);

  const handleFerrChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFerrFormData({ ...ferrFormData, [name]: value });
    setErrorMessage(null);
    setFerrResults(null);
  };

  const handleElementsChange = (updated: typeof elements) => {
    setElements(updated);
    setErrorMessage(null);
    setFerrResults(null);
  };

  const validateFerr = () => {
    const requiredFields = [
      'As',
    ];
    for (const key of requiredFields) {
      const value = ferrFormData[key];
      if (!value || value.trim() === '' || isNaN(Number(value))) {
        setErrorMessage('Tous les champs doivent être remplis avec des nombres valides.');
        return false;
      }
    }
    return true;
  };

  const handleFerrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFerr()) return;

    const data: FerrFormData = {
      As: Number(ferrFormData.As),
      elements,
    };

    const base = calculerFerrResultats(data);

    setFerrResults(base);
  };

  //
  // UI
  //

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 mb-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Calcul Béton Armé - Poutre (BAEL 91 mod 99)
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        
        <div className='w-full lg:w-1/2'>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center mb-10">

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

            <button
              onClick={() => setActiveTab('ferr')}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-38
              ${activeTab === 'ferr' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Ferraillage
            </button>

          </div>

          {activeTab === 'dim' && (
            <FormPoutre
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              errorMessage={errorMessage}
            />
          )}

          {activeTab === 'predim' && (
            <FormPreDimPoutre
              formData={preDimFormData}
              onChange={handlePreDimChange}
              onSubmit={handlePreDimSubmit}
              errorMessage={errorMessage}
            />
          )}

          {activeTab === 'ferr' && (
            <FormFerr
              formData={ferrFormData}
              onChange={handleFerrChange}
              onSubmit={handleFerrSubmit}
              errorMessage={errorMessage}
              elements={elements}
              setElements={handleElementsChange}
            />
          )}

        </div>

        <div className="hidden lg:block w-px bg-gray-300"></div>

        {activeTab === 'dim' && (
          <div className='w-full lg:w-1/2 min-h-full'>
            <ResultatsPoutre results={results} />
          </div>
        )}

        {activeTab === 'predim' && (

          <div className='lg:w-1/2 flex flex-col'>

            <div className='w-full min-h-full'>
              <ResultatsPreDimPoutre results={preDimResults}/>
            </div>

            {preDimResults && (

              <div className='mt-10 lg:mt-4 flex justify-center lg:justify-end'>
                <button 
                  className="text-black hover:text-blue-600 transition cursor-pointer font-semibold"
                  onClick={() => {
                  setFormData?.((prev) => ({
                    ...prev,
                    largeur: preDimResults?.b?.toString() ?? '',
                    hauteur: preDimResults?.h?.toString() ?? '',
                  }));
                  setActiveTab?.('dim');
                }
              }
                >
                  Exporter vers dimensionnement →
                </button>
              </div>
              
            )}

          </div>
        )}

        {activeTab === 'ferr' && (
          <div className='w-full lg:w-1/2 min-h-full'>
            <ResultatsFerr results={ferrResults} />
          </div>
        )}

      </div>
    </main>
  );
}