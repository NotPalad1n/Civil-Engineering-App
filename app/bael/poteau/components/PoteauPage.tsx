'use client';
import { useState } from 'react';

import FormPreDimPoteau from './PreDim/FormPreDimPoteau';
import ResultatsPreDimPoteau from './PreDim/ResultatsPreDimPoteau';
import { calculerPreDimResultats, PreDimFormData, PreDimResults } from './PreDim/calculsPreDim';

import FormPoteau from './Dim/FormPoteau';
import ResultatsPoteau from './Dim/ResultatsPoteau';
import { calculerBaseResultats, FormData, BaseResults } from './Dim/calculs';

import FormFerr from '../../Ferr/FormFerr';
import ResultatsFerr from '../../Ferr/ResultatsFerr';
import { calculerFerrResultats, FerrFormData, FerrResults } from '../../Ferr/calculsFerr';

import { motion, AnimatePresence } from "framer-motion";

export default function PoteauPage() {

  const [activeTab, setActiveTab] = useState<'predim' | 'dim' | 'ferr'>('predim');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);

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
    setErrorTitle(null);
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
        setErrorTitle('Erreur de saisie');
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

  const [results, setResults] = useState<(BaseResults) | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorTitle(null);
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
        setErrorTitle('Erreur de saisie');
        setErrorMessage('Tous les champs doivent être remplis avec des nombres valides.');
        return false;
      }
    }

    if (formData.largeur > formData.longueur) {
      setErrorTitle('Erreur de saisie');
      setErrorMessage("La largeur du poteau doit être inferieur à la longueur du poteau.");
      return false;
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

    const results = calculerBaseResultats(data);

    setResults(results);
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
    setErrorTitle(null);
    setErrorMessage(null);
    setFerrResults(null);
  };

  const handleElementsChange = (updated: typeof elements) => {
    setElements(updated);
    setErrorTitle(null);
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
        setErrorTitle('Erreur de saisie');
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
        Calcul Béton Armé - Poteau (BAEL 91 mod 99)
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        
        <div className='w-full lg:w-1/2'>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center mb-10">

            <button
              onClick={() => {
                setActiveTab('predim');
                setErrorTitle(null);
                setErrorMessage(null);
              }}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-38
              ${activeTab === 'predim' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Pré-dimensionnement
            </button>

            <button
              onClick={() => {
                setActiveTab('dim');
                setErrorTitle(null);
                setErrorMessage(null);
              }}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-38
              ${activeTab === 'dim' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Dimensionnement
            </button>

            <button
              onClick={() => {
                setActiveTab('ferr');
                setErrorTitle(null);
                setErrorMessage(null);
              }}
              className={`px-2 py-2 rounded font-semibold cursor-pointer text-xs min-w-38
              ${activeTab === 'ferr' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Ferraillage
            </button>

          </div>

          {activeTab === 'dim' && (     
            <FormPoteau
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}

          {activeTab === 'predim' && (
            <FormPreDimPoteau
              formData={preDimFormData}
              onChange={handlePreDimChange}
              onSubmit={handlePreDimSubmit}
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

          <AnimatePresence>
            {errorMessage && (
              /* Wrapper de centrage pour éviter les conflits de transform */
              <div className="fixed bottom-6 inset-x-0 flex justify-center z-[100] pointer-events-none px-4">
                
                <motion.div 
                  initial={{ y: 70, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 70, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  
                  /* Styling Error : Fond rouge très léger, bordure rouge prononcée */
                  className="pointer-events-auto bg-red-50 shadow-2xl border border-red-200 rounded-2xl p-4 flex items-center space-x-4 w-full max-w-[500px]"
                >
                  {/* Icône d'alerte */}
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  {/* Message d'erreur */}
                  <div className="flex-1">
                    <span className="font-bold text-red-800 block text-sm">{errorTitle}</span>
                    <p className="text-red-600 text-xs leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>

                  {/* Bouton pour fermer le message (optionnel) */}
                  <button 
                    onClick={() => setErrorMessage(null)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>

        <div className="hidden lg:block w-px bg-gray-300"></div>

          {activeTab === 'dim' && (

            <div className='lg:w-1/2 flex'>

              <div className='w-full min-h-full'>
                <ResultatsPoteau results={results} />
              </div>

              <AnimatePresence>
                {results && (
                  <motion.div 

                  /* Animation d'entrée : part de 50px vers le bas et invisible */
                  initial={{ y: 50, opacity: 0 }}
                  /* Animation d'état actif : revient à sa place et devient visible */
                  animate={{ y: 0, opacity: 1 }}
                  /* Animation de sortie : repart vers le bas quand results disparait */
                  exit={{ y: 50, opacity: 0 }}
                  /* Réglage de la fluidité (type "ressort" pour un côté pro) */
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-2xl border border-blue-100 rounded-2xl p-4 lg:space-x-6 z-50 flex items-center justify-between lg:min-w-[500px] flex-col lg:flex-row text-center lg:text-left space-y-2 lg:space-y-0"
                  >
                    <div className="text-sm">
                      <span className="font-bold text-blue-600">Calcul terminé !</span>
                      <p className="text-gray-500">Section nécessaire : <span className="font-semibold text-gray-700">{results.As} cm²</span></p>
                    </div>
                    <button 
                      onClick={() => {
                          setFerrFormData?.((prev) => ({
                            ...prev,
                            As: results?.As?.toString() ?? '',
                          }));
                          setActiveTab?.('ferr');
                        }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors min-w-[233px] cursor-pointer"
                    >
                      Configurer le ferraillage
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>

          )}
          
          {activeTab === 'predim' && (
            
            <div className='lg:w-1/2 flex'>

              <div className='w-full min-h-full'>
                <ResultatsPreDimPoteau results={preDimResults}/>
              </div>

              <AnimatePresence>
                {preDimResults && (
                  <motion.div 

                  /* Animation d'entrée : part de 50px vers le bas et invisible */
                  initial={{ y: 50, opacity: 0 }}
                  /* Animation d'état actif : revient à sa place et devient visible */
                  animate={{ y: 0, opacity: 1 }}
                  /* Animation de sortie : repart vers le bas quand results disparait */
                  exit={{ y: 50, opacity: 0 }}
                  /* Réglage de la fluidité (type "ressort" pour un côté pro) */
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}

                  className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-2xl border border-blue-100 rounded-2xl p-4 lg:space-x-6 z-50 flex items-center justify-between lg:min-w-[500px] flex-col lg:flex-row text-center lg:text-left space-y-2 lg:space-y-0"
                  >
                    {/* Texte informatif */}
                    <div className="text-sm">
                      <span className="font-bold text-blue-600 block">Calcul terminé !</span>
                      <p className="text-gray-500">
                        Section suggérée : <span className="font-semibold text-gray-700">{preDimResults.asq} × {preDimResults.bsq} cm</span>
                      </p>
                    </div>

                    {/* Bouton d'action avec ta logique de transfert */}
                    <button 
                      onClick={() => {
                        setFormData?.((prev) => ({
                          ...prev,
                          largeur: preDimResults?.asq?.toString() ?? '',
                          longueur: preDimResults?.bsq?.toString() ?? '',
                          Nu: preDimFormData?.Nu?.toString() ?? '',
                        }));
                        setActiveTab?.('dim');
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors min-w-[233px] cursor-pointer"
                    >
                      Dimensionner la section
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              

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