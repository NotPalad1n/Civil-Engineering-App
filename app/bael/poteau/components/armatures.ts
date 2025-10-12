const barOptions = [
  { label: 'HA20', dia: 20, area: (Math.PI * 20 ** 2) / 4 },
  { label: 'HA16', dia: 16, area: (Math.PI * 16 ** 2) / 4 },
  { label: 'HA14', dia: 14, area: (Math.PI * 14 ** 2) / 4 },
  { label: 'HA12', dia: 12, area: (Math.PI * 12 ** 2) / 4 },
  { label: 'HA10', dia: 10, area: (Math.PI * 10 ** 2) / 4 },
];

export function suggererArmatures(As: number, largeur: number, longueur: number): string {
  const As_mm2 = As * 100;
  const perimeter_mm = 2 * (largeur + longueur) * 10;
  const minSpacing = 25;

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

            if (totalBars < minBars || (totalBars === minBars && excess < minExcess)) {
              minBars = totalBars;
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

  console.log('Best combo:', bestCombo, 'Excess:', minExcess);

  return  bestCombo;
}