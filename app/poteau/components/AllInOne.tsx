'use client';
import { useState } from 'react';

export default function ColonnePage() {
  const [formData, setFormData] = useState({
    hauteurPoteau: '',
    facteurFlambement: '1',
    largeur: '',
    longueur: '',
    Nu: '',
    fc28: '',
    fe: '500',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [results, setResults] = useState<{
    Ath?: number;
    As?: number;
    Amin?: number;
    Br?: number;
    alpha?: number;
    lambda?: number;
    suggestion?: string;
    // Add other result fields as needed
  } | null>(null);

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
      const value = formData[key as keyof typeof formData];
      if (value.trim() === '' || isNaN(Number(value))) {
        setErrorMessage('Tous les champs doivent être remplis avec des nombres valides.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse inputs
    const h = Number(formData.hauteurPoteau); // m
    const f = Number(formData.facteurFlambement);
    const largeur = Number(formData.largeur); // cm
    const longueur = Number(formData.longueur); // cm
    const Nu = Number(formData.Nu); // kN
    const fc28 = Number(formData.fc28); // MPa
    const fe = Number(formData.fe); // MPa

    // Convert cm to m for area calculation
    const a = largeur / 100;
    const b = longueur / 100;

    // TODO: Replace below with your BAEL calculation formulas
    
    const lambda = 2*Math.sqrt(3)*(h*f)/a;
    let alpha = 0;
    if (lambda <= 50) {
      alpha = 0.85/(1+0.2*(lambda/35)*(lambda/35));
      
    }
    else if (lambda > 50 && lambda <= 70) {
      alpha = 0.6*(50/lambda)^2;
    }
    const Br = (a-0.02)*(b-0.02);
    let Ath = (Nu/(1000*alpha) - (Br*fc28)/(0.9*1.5))*(1.15/fe); // Aire théorique d'armature
    const A1 = 0.2*a*b;
    const A2 = 4*(2*(a+b));
    const Amin = Math.max(A1,A2);

    Ath = Ath * 10000; // Convert m² to cm²

    const As = Math.max(Ath, Amin); // Aire d'armature

    // Bar diameter options (in mm)

    const barOptions = [
      { label: 'HA20', dia: 20, area: (Math.PI * 20 ** 2) / 4 },
      { label: 'HA16', dia: 16, area: (Math.PI * 16 ** 2) / 4 },
      { label: 'HA14', dia: 14, area: (Math.PI * 14 ** 2) / 4 },
      { label: 'HA12', dia: 12, area: (Math.PI * 12 ** 2) / 4 },
      { label: 'HA10', dia: 10, area: (Math.PI * 10 ** 2) / 4 },
    ];

    const As_mm2 = As * 100; // cm² to mm²

    // Calculate perimeter and spacing constraints
    const perimeter_mm = 2 * (largeur + longueur) * 10; // cm to mm
    const minSpacing = 25; // mm

    // Search mixed bar combos (two types)
    let bestCombo = '';
    let minBars = Infinity;
    let minExcess = Infinity;

    for (let i = 0; i < barOptions.length; i++) {
      for (let j = i; j < barOptions.length; j++) {
        const barA = barOptions[i];
        const barB = barOptions[j];

        for (let nA = 0; nA <= 10; nA++) {
          for (let nB = 0; nB <= 10; nB++) {
            const totalBars = nA + nB;

            // Conditions:
            // total bars even and ≥4
            // each bar count even if used
            // AND **at least one of nA or nB ≥ 4 if both are > 0**

            if (
              totalBars < 4 ||
              totalBars % 2 !== 0 ||
              (nA > 0 && nA % 2 !== 0) ||
              (nB > 0 && nB % 2 !== 0) ||
              (nA > 0 && nB > 0 && nA < 4 && nB < 4)
            )
              continue;

            const barDiametersUsed = [];
            if (nA > 0) barDiametersUsed.push(barA.dia);
            if (nB > 0) barDiametersUsed.push(barB.dia);
            const smallestDia = Math.min(...barDiametersUsed);

            const maxBars = Math.floor(perimeter_mm / (smallestDia + minSpacing));
            if (totalBars > maxBars) continue;

            const totalArea = nA * barA.area + nB * barB.area;
            if (totalArea >= As_mm2) {
              const excess = totalArea - As_mm2;

              // If fewer bars, pick it
              if (totalBars < minBars) {
                minBars = totalBars;
                minExcess = excess;
                const partA = nA > 0 ? `${nA}${barA.label}` : '';
                const partB = nB > 0 ? `${nB}${barB.label}` : '';
                bestCombo = [partA, partB].filter(Boolean).join(' + ');
              } else if (totalBars === minBars && excess < minExcess) {
                // If same number of bars, pick less excess
                minExcess = excess;
                const partA = nA > 0 ? `${nA}${barA.label}` : '';
                const partB = nB > 0 ? `${nB}${barB.label}` : '';
                bestCombo = [partA, partB].filter(Boolean).join(' + ');
              }
            }
          }
        }
      }
    }

    // For single bar fallback:

    let bestSingle = '';
    let minSingleBars = Infinity;
    let minSingleExcess = Infinity;

    for (const bar of barOptions) {
      for (let n = 4; n <= 12; n += 2) {
        const totalArea = n * bar.area;
        if (totalArea >= As_mm2) {
          const maxBars = Math.floor(perimeter_mm / (bar.dia + minSpacing));
          if (n > maxBars) continue;

          const excess = totalArea - As_mm2;

          if (n < minSingleBars) {
            minSingleBars = n;
            minSingleExcess = excess;
            bestSingle = `${n}${bar.label}`;
          } else if (n === minSingleBars && excess < minSingleExcess) {
            minSingleExcess = excess;
            bestSingle = `${n}${bar.label}`;
          }
        }
      }
    }

    console.log(bestCombo);
    console.log(bestSingle);

    const finalSuggestion =
      minSingleBars < minBars ||
      (minSingleBars === minBars && minSingleExcess < minExcess)
        ? bestSingle
        : bestCombo;

    // Save results in state
    
    setResults({
      lambda: parseFloat(lambda.toFixed(2)),
      alpha: parseFloat(alpha.toFixed(2)),
      Br: parseFloat(Br.toFixed(2)),
      Ath: parseFloat(Ath.toFixed(2)),
      Amin: parseFloat(Amin.toFixed(2)),
      As: parseFloat(As.toFixed(2)),
      suggestion: finalSuggestion,
    });

    setErrorMessage(null);
  };

  const inputClass =
    'w-full border border-gray-300 rounded px-3 py-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass =
    'w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800';

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Calcul de ferraillage - Poteau (BAEL)
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="block mb-1">Facteur de flambement</label>
              <select
                name="facteurFlambement"
                value={formData.facteurFlambement}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="2">2</option>
                <option value="1">1</option>
                <option value="0.707">0.707</option>
                <option value="0.5">0.5</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

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
              <select
                name="fe"
                value={formData.fe}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="400">400</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition"
          >
            Calculer
          </button>

          {errorMessage && (
            <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
          )}
        </form>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gray-300"></div>

        {/* Résultats */}
        <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3">
          {results ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Résultats
              </h2>
              <p>
                <strong>λ :</strong> {results.lambda}
              </p>
              <p>
                <strong>α :</strong> {results.alpha}
              </p>
              <p>
                <strong>B<sub>r</sub> :</strong> {results.Br} m²
              </p>
              <p>
                <strong>A<sub>th</sub> :</strong> {results.Ath} cm²
              </p>
              <p>
                <strong>A<sub>min</sub> :</strong> {results.Amin} cm²
              </p>
              <p>
                <strong>Acier nécessaire A<sub>s</sub> :</strong> {results.As} cm²
              </p>
              <p>
                <strong>Suggestion d’armature :</strong> {results.suggestion}
              </p>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Remplissez le formulaire et cliquez sur calculer.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}