export interface FormData {
  largeur: number;
  hauteur: number;
  fissuration: string;
  Mu: number;
  Mser: number;
  Vu: number;
  fc28: number;
  fe: number;
}

export interface BaseResults {
  Ast: number;
  Asc: number;
  Asts: number;
  Ascs: number;
}

export function calculerBaseResultats(data: FormData): BaseResults {
  const largeur = data.largeur; // cm
  const h = data.hauteur; // cm
  const fissuration = data.fissuration; // coefficient de fissuration
  const Mu = data.Mu; // kNm
  const Mser = data.Mser; // kNm
  const Vu = data.Vu; // kNm
  const fc28 = data.fc28; // MPa
  const fe = data.fe; // MPa

  const b = largeur / 100; // Convert cm to m
  const d = 0.9 * h / 100; // Convert cm to m
  const dprime = 0.1 * h / 100; // Convert cm to m
  const fbu = (0.85*fc28)/(1.5) // MPa

  // let epsilonL = 1.739/1000;
  let alphaL = 0.668
  let muL = 0.392;

  let Ast = 0;
  let Asc = 0;

  let Asts = 0;
  let Ascs = 0;

  if (fe === 500) {
    // epsilonL = 2.174/1000;
    alphaL = 0.617;
    muL = 0.371;
  }

  //
  // Etat limite ultime : ELU
  //

  const muU = Mu / (b*d**2 * fbu * 1000);

  if (muU < 0.186 || muU < muL) {

    const fsu = fe/1.15; // MPa
    const alphaU = 1.25*(1-Math.sqrt(1-2*muU));
    const Z = d*(1-0.4*alphaU);
    Ast = (Mu) / (fsu * Z *1000);
    Asc = 0;

  }

  else {

    // const epsilonSC = (3.5*10**-3 + epsilonL)*((d-dprime)/d) - epsilonL;
    const sigmaSC = fe/1.15; // MPa
    const Mr = muL*b*d**2*fbu*1000; // kNm
    const Z = d*(1 - 0.4*alphaL);
    Asc = (Mu - Mr) / ((d-dprime)*sigmaSC * 1000);
    Ast = (Mr/(Z) + (Mu-Mr)/(d-dprime))*(1.15/(fe * 1000));

  }

  Ast = Ast * 10000; // Convert m² to cm²
  Asc = Asc * 10000; // Convert m² to cm²

  //
  // Etat limite service : ELS
  //

  const ft28 = 0.6 + 0.06 * fc28; // MPa
  const sigmaBC = 0.6* fc28; // MPa
  const sigmaST = Math.min(2/3 * fe,110*Math.sqrt(1.6*ft28)); // MPa

  const alphabar = (15*sigmaBC)/(15*sigmaBC + sigmaST);
  const y1 = alphabar * d;
  const Z = d*(1 - alphabar/3);
  const Mrsb = 1/2 *b*y1*sigmaBC*Z * 1000; // kNm

  if (Mser < Mrsb) {
    Asts = Mser / (sigmaST * Z * 1000);
    Ascs = 0;
  }
  else {
    const sigmaSC = (15*sigmaBC*(y1 - dprime))/(y1);
    Ascs = (Mser - Mrsb)/((d-dprime)*sigmaSC * 1000);
    Asts = (Mrsb/Z + (Mser - Mrsb)/(d-dprime))*(1/(sigmaST * 1000));
  }

  Asts = Asts * 10000; // Convert m² to cm²
  Ascs = Ascs * 10000; // Convert m² to cm²

  console.log(fissuration, Vu);

  return {
    Ast: parseFloat(Ast.toFixed(2)),
    Asc: parseFloat(Asc.toFixed(2)),
    Asts: parseFloat(Asts.toFixed(2)),
    Ascs: parseFloat(Ascs.toFixed(2)),
  };
}
