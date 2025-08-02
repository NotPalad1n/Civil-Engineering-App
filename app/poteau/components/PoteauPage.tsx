'use client';
import { useState } from 'react';
import FormPoteau from './Dim/FormPoteau';
import FormPreDimPoteau from './PreDim/FormPreDimPoteau';
import ResultatsPoteau from './Dim/ResultatsPoteau';
import ResultatsPreDimPoteau from './PreDim/ResultatsPreDimPoteau';
import { calculerBaseResultats, FormData, BaseResults } from './Dim/calculs';
import { calculerPreDimResultats, PreDimFormData, PreDimResults } from './PreDim/calculsPreDim';
import { suggererArmatures } from './armatures';

export default function PoteauPage() {

  const [activeTab, setActiveTab] = useState<'predim' | 'dim'>('predim');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //
  // Pre-dimensionnement
  //

  const [preDimFormData, setPreDimFormData] = useState<Record<string, string>>({
    Nu: '',
    largeur: '25',
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
      'Nu',
      'largeur',
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
      Nu: Number(preDimFormData.Nu),
      largeur: Number(preDimFormData.largeur),
    };

    const base = calculerPreDimResultats(data);

    setPreDimResults(base);
  };

  //
  // Dimentionnement
  //

  const [formData, setFormData] = useState<Record<string, string>>({
    hauteurPoteau: '',
    facteurFlambement: '1',
    largeur: '',
    longueur: '',
    Nu: '',
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
      'hauteurPoteau',
      'largeur',
      'longueur',
      'Nu',
      'fc28',
      'fe',
      'facteurFlambement',
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
      hauteurPoteau: Number(formData.hauteurPoteau),
      facteurFlambement: Number(formData.facteurFlambement),
      largeur: Number(formData.largeur),
      longueur: Number(formData.longueur),
      Nu: Number(formData.Nu),
      fc28: Number(formData.fc28),
      fe: Number(formData.fe),
    };

    const base = calculerBaseResultats(data);
    const suggestion = suggererArmatures(base.As, data.largeur, data.longueur);

    setResults({ ...base, suggestion });
  };

  //
  // UI
  //

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 mb-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Calcul Béton Armé - Poteau (BAEL 91 mod 99)
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
            <FormPoteau
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              errorMessage={errorMessage}
            />
          )}
          {activeTab === 'predim' && (
            <FormPreDimPoteau
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
            <ResultatsPoteau results={results} />
          </div>
        )}
        {activeTab === 'predim' && (
          
          <div className='lg:w-1/2 flex flex-col'>

            <div className='w-full min-h-full'>
              <ResultatsPreDimPoteau results={preDimResults}/>
            </div>

            {preDimResults && (

              <div className='mt-10 lg:mt-4 flex justify-center lg:justify-end'>
                <button 
                  className="text-black hover:text-blue-600 transition cursor-pointer font-semibold"
                  onClick={() => {
                  setFormData?.((prev) => ({
                    ...prev,
                    largeur: preDimResults?.asq?.toString() ?? '',
                    longueur: preDimResults?.bsq?.toString() ?? '',
                    Nu: preDimFormData?.Nu?.toString() ?? '',
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

      </div>

    </main>
  );
}