'use client';
import { useState } from 'react';

import FormSemelle from './Dim/FormSemelle';
import { calculerBaseResultats, FormData, BaseResults } from './Dim/calculs';
import ResultatsSemelle from './Dim/ResultatsSemelle';

import FormPreDimSemelle from './PreDim/FormPreDimSemelle';
import { calculerPreDimResultats, PreDimFormData, PreDimResults } from './PreDim/calculsPreDim';
import ResultatsPreDimSemelle from './PreDim/ResultatsPreDimSemelle';

import FormFerr from '../../Ferr/FormFerr';
import ResultatsFerr from '../../Ferr/ResultatsFerr';
import { calculerFerrResultats, FerrFormData, FerrResults } from '../../Ferr/calculsFerr';

import { motion, AnimatePresence } from "framer-motion";

import ErrorToast from '@/app/components/ErrorToast';

export default function SemellePage() {
  
  const [activeTab, setActiveTab] = useState<'predim' | 'dim' | 'ferr'>('predim');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  //
  // Pre-dimensionnement
  //

  const [preDimFormData, setPreDimFormData] = useState<Record<string, string>>({
    largeurPoteau: '',
    longueurPoteau: '',
    contrainte: '',
    Nser: '',
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
      'largeurPoteau',
      'longueurPoteau',
      'contrainte',
      'Nser',
    ];

    for (const key of requiredFields) {
      const value = preDimFormData[key];
      if (!value || value.trim() === '' || isNaN(Number(value))) {
        setErrorTitle('Erreur de saisie');
        setErrorMessage('Tous les champs doivent être remplis avec des nombres valides.');
        return false;
      }
    }

    if (formData.largeurPoteau > formData.longueurPoteau) {
      setErrorTitle('Erreur de saisie');
      setErrorMessage("La largeur du poteau doit être inferieur à la longueur du poteau.");
      return false;
    }
    
    return true;
  };

  const handlePreDimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePreDim()) return;

    const data: PreDimFormData = {
      largeurPoteau: Number(preDimFormData.largeurPoteau),
      longueurPoteau: Number(preDimFormData.longueurPoteau),
      contrainte: Number(preDimFormData.contrainte),
      Nser: Number(preDimFormData.Nser),
    };

    const base = calculerPreDimResultats(data);

    setPreDimResults(base);
  };

  //
  // Dimentionnement
  //
  
  const [formData, setFormData] = useState<Record<string, string>>({
    largeur: '',
    longueur: '',
    largeurPoteau: '',
    longueurPoteau: '',
    hauteur: '',
    contrainte: '',
    Nu: '',
    Nser: '',
    fe: '500',
  });

  const [results, setResults] = useState<(BaseResults) | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(null);
    setErrorTitle(null);
    setResults(null);
  };

  const validate = () => {
    const requiredFields = [
      'largeur',
      'longueur',
      'largeurPoteau',
      'longueurPoteau',
      'hauteur',
      'contrainte',
      'Nu',
      'Nser',
      'fe',
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
      setErrorMessage("La largeur de la semelle doit être inferieur à la longueur de la semelle.");
      return false;
    }

    if (formData.largeurPoteau > formData.longueurPoteau) {
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
      largeur: Number(formData.largeur),
      longueur: Number(formData.longueur),
      largeurPoteau: Number(formData.largeurPoteau),
      longueurPoteau: Number(formData.longueurPoteau),
      hauteur: Number(formData.hauteur),
      contrainte: Number(formData.contrainte),
      Nu: Number(formData.Nu),
      Nser: Number(formData.Nser),
      fe: Number(formData.fe),
    };

    const base = calculerBaseResultats(data);

    setResults(base);
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
    setErrorTitle(null);
    setFerrResults(null);
  };

  const handleElementsChange = (updated: typeof elements) => {
    setElements(updated);
    setErrorMessage(null);
    setErrorTitle(null);
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
        Calcul Béton Armé - Semelle isolée (BAEL 91 mod 99)
      </h1>

      <ErrorToast 
        message={errorMessage} 
        onClose={() => setErrorMessage(null)} 
        title={errorTitle}
      />

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
            <FormSemelle
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}

          {activeTab === 'predim' && (
            <FormPreDimSemelle
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

        </div>

        <div className="hidden lg:block w-px bg-gray-300"></div>

        {activeTab === 'dim' && (

          <div className='lg:w-1/2 flex flex-col'>

            <div className='w-full min-h-full'>
              <ResultatsSemelle results={results} />
            </div>

            <AnimatePresence>
              {results && !results.warning && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-2xl border border-blue-100 rounded-2xl p-4 lg:space-x-6 z-50 flex items-center justify-between lg:min-w-[500px] flex-col lg:flex-row text-center lg:text-left space-y-2 lg:space-y-0"
                >
                  {/* Résumé des sections d'acier de la semelle */}
                  <div className="flex flex-col">
                    <span className="font-bold text-blue-600 block text-sm">Calcul terminé !</span>
                    <div className="flex space-x-4 text-[11px] mt-1">
                      <p className="text-gray-500">
                        Aciers // A : <span className="font-semibold text-gray-700">{results.Asx} cm²</span>
                      </p>
                      <div className="hidden lg:block w-px bg-gray-300"></div>
                      <p className="text-gray-500">
                        Aciers // B : <span className="font-semibold text-gray-700">{results.Asy} cm²</span>
                      </p>
                    </div>
                  </div>

                  {/* Action de transfert vers le ferraillage */}
                  <button 
                    onClick={() => {
                      // Si ton formulaire de ferraillage prend une valeur par défaut,
                      // tu peux lui passer la section maximale par exemple :
                      setFerrFormData?.((prev) => ({
                        ...prev,
                        As: Math.max(results.Asx, results.Asy).toString(),
                      }));
                      
                      setActiveTab?.('ferr');
                      // Scroller doucement vers le haut pour voir le nouveau formulaire
                      window.scrollTo({ top: 0, behavior: 'smooth' });
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

          <div className='lg:w-1/2 flex flex-col'>

            <div className='w-full min-h-full'>
              <ResultatsPreDimSemelle results={preDimResults}/>
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
                      Section suggérée : <span className="font-semibold text-gray-700">{preDimResults.A} × {preDimResults.B} m</span>
                    </p>
                  </div>

                  {/* Bouton d'action avec ta logique de transfert */}
                  <button 
                    onClick={() => {
                      setFormData?.((prev) => ({
                        ...prev,
                        largeur: preDimResults?.A?.toString() ?? '',
                        longueur: preDimResults?.B?.toString() ?? '',
                        largeurPoteau: preDimFormData?.largeurPoteau?.toString() ?? '',
                        longueurPoteau: preDimFormData?.longueurPoteau?.toString() ?? '',
                        hauteur: preDimResults?.D?.toString() ?? '',
                        contrainte: preDimFormData?.contrainte?.toString() ?? '',
                        Nser: preDimFormData?.Nser?.toString() ?? '',
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