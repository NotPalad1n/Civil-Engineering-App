export interface FormData {
  hauteurPoteau: number;
  facteurFlambement: number;
  largeur: number;
  longueur: number;
  Nu: number;
  fc28: number;
  fe: number;
}

export interface Results {
  Ath: number;
  As: number;
  Amin: number;
  Br: number;
  alpha: number;
  lambda: number;
  suggestion: string;
}

const barOptions = [
  { label: 'HA20', dia: 20, area: (Math.PI * 20 ** 2) / 4 },
  { label: 'HA16', dia: 16, area: (Math.PI * 16 ** 2) / 4 },
  { label: 'HA14', dia: 14, area: (Math.PI * 14 ** 2) / 4 },
  { label: 'HA12', dia: 12, area: (Math.PI * 12 ** 2) / 4 },
  { label: 'HA10', dia: 10, area: (Math.PI * 10 ** 2) / 4 },
];

export function calculerResultats(data: FormData): Results {
  const h = data.hauteurPoteau; // m
  const f = data.facteurFlambement;
  const largeur = data.largeur; // cm
  const longueur = data.longueur; // cm
  const Nu = data.Nu; // kN
  const fc28 = data.fc28; // MPa
  const fe = data.fe; // MPa

  const a = largeur / 100; // m
  const b = longueur / 100; // m

  const lambda = 2 * Math.sqrt(3) * (h * f) / a;
  let alpha = 0;
  if (lambda <= 50) {
    alpha = 0.85 / (1 + 0.2 * (lambda / 35) ** 2);
  } else if (lambda > 50 && lambda <= 70) {
    alpha = 0.6 * (50 / lambda) ** 2;
  }
  const Br = (a - 0.02) * (b - 0.02);
  let Ath = (Nu / (1000 * alpha) - (Br * fc28) / (0.9 * 1.5)) * (1.15 / fe); // m² théorique armature
  Ath = Ath * 10000; // cm²

  const A1 = 0.2 * a * b;
  const A2 = 4 * (2 * (a + b));
  const Amin = Math.max(A1, A2);

  const As = Math.max(Ath, Amin); // cm² armature requise

  const As_mm2 = As * 100; // cm² to mm²
  const perimeter_mm = 2 * (largeur + longueur) * 10; // cm to mm
  const minSpacing = 25; // mm

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

            if (totalBars < minBars) {
              minBars = totalBars;
              minExcess = excess;
              const partA = nA > 0 ? `${nA}${barA.label}` : '';
              const partB = nB > 0 ? `${nB}${barB.label}` : '';
              bestCombo = [partA, partB].filter(Boolean).join(' + ');
            } else if (totalBars === minBars && excess < minExcess) {
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

  const finalSuggestion =
    minSingleBars < minBars ||
    (minSingleBars === minBars && minSingleExcess < minExcess)
      ? bestSingle
      : bestCombo;

  return {
    lambda: parseFloat(lambda.toFixed(2)),
    alpha: parseFloat(alpha.toFixed(2)),
    Br: parseFloat(Br.toFixed(2)),
    Ath: parseFloat(Ath.toFixed(2)),
    Amin: parseFloat(Amin.toFixed(2)),
    As: parseFloat(As.toFixed(2)),
    suggestion: finalSuggestion,
  };
}
