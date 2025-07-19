'use client';
import { useState } from 'react';
import FormPoteau from './FormPoteau';
import ResultatsPoteau from './ResultatsPoteau';
import { calculerBaseResultats, FormData, BaseResults } from './calculs';
import { suggererArmatures } from './armatures';

export default function PoteauPage() {
  const [formData, setFormData] = useState<Record<string, string>>({
    hauteurPoteau: '',
    facteurFlambement: '1',
    largeur: '',
    longueur: '',
    Nu: '',
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

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 mb-15">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Calcul de ferraillage - Poteau (BAEL)
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        <FormPoteau
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
        />

        <div className="hidden lg:block w-px bg-gray-300"></div>

        <ResultatsPoteau results={results} />
      </div>
    </main>
  );
}