'use client';
import { useState } from 'react';
import FormDalle from './FormDalle';
import ResultatsDalle from './ResultatsDalle';
import { calculerBaseResultats, FormData, BaseResults } from './calculs';
import { suggererArmatures } from './armatures';

export default function DallePage() {
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

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 mb-15">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Calcul de ferraillage - Dalle pleine (BAEL)
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        <FormDalle
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
        />

        <div className="hidden lg:block w-px bg-gray-300"></div>

        <ResultatsDalle results={results} />
      </div>
    </main>
  );
}