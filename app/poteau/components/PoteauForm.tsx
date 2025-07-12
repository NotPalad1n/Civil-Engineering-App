'use client';
import { useState } from 'react';

export default function ColonnePage() {
  const [formData, setFormData] = useState({
    hauteurPoteau: '',
    largeur: '',
    longueur: '',
    Nu: '',
    fc28: '',
    fe: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(null);
    setResult(null);
  };

  const validate = () => {
    for (const value of Object.values(formData)) {
      if (isNaN(Number(value)) || value.trim() === '') {
        setErrorMessage('Tous les champs doivent être remplis avec des nombres valides.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { largeur, longueur, Nu, fc28, fe } = formData;

    const b = Number(largeur) / 100;
    const h = Number(longueur) / 100;
    const n = Number(Nu) * 1000; // kN → N
    const fcd = (Number(fc28) * 1e6) / 1.5;
    const fyd = (Number(fe) * 1e6) / 1.15;

    const ac = b * h;
    const Rc = 0.85 * fcd * ac;
    let as = (n - Rc) / fyd;

    if (as < 0) as = 0;

    setResult(as * 1e4); // m² → cm²
    setErrorMessage(null);
  };

  const inputClass =
    'w-full border border-gray-300 rounded px-3 py-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Calcul de ferraillage - Poteau
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hauteur */}
        <div>
          <label className="block mb-1">Hauteur du poteau (m)</label>
          <input
            type="number"
            inputMode="decimal"
            name="hauteurPoteau"
            value={formData.hauteurPoteau}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Largeur & Longueur */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Largeur (cm)</label>
            <input
              type="number"
              inputMode="decimal"
              name="largeur"
              value={formData.largeur}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block mb-1">Longueur (cm)</label>
            <input
              type="number"
              inputMode="decimal"
              name="longueur"
              value={formData.longueur}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Nu */}
        <div>
          <label className="block mb-1">Effort normal N<sub>u</sub> (kN)</label>
          <input
            type="number"
            inputMode="decimal"
            name="Nu"
            value={formData.Nu}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* fc28 & fe */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Résistance du béton f<sub>c28</sub> (MPa)</label>
            <input
              type="number"
              inputMode="decimal"
              name="fc28"
              value={formData.fc28}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block mb-1">Résistance de l’acier f<sub>e</sub> (MPa)</label>
            <input
              type="number"
              inputMode="decimal"
              name="fe"
              value={formData.fe}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition cursor-pointer"
        >
          Calculer l’acier requis
        </button>
      </form>

      {/* 🔴 Message d'erreur global */}
      {errorMessage && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-center">
          {errorMessage}
        </div>
      )}

      {/* ✅ Résultat */}
      {result !== null && !errorMessage && (
        <div className="mt-6 bg-gray-100 border-l-4 border-blue-600 p-4 text-center rounded">
          <p className="text-lg font-semibold">
            Acier nécessaire A<sub>s</sub> = {result.toFixed(2)} cm²
          </p>
        </div>
      )}
    </main>
  );
}