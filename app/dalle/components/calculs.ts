export interface FormData {
  longueur: number;
  largeur: number;
  epaisseur: number;
  fissuration: string;
  Pu: number;
  Pser: number;
  fc28: number;
  fe: number;
}

export interface BaseResults {
  Astx: number;
  Ascx: number;
  Asty: number;
  Ascy: number;
  Axmin: number;
  Aymin: number;
  Stx: number;
  Sty: number;
  message?: string;
}

export function calculerBaseResultats(data: FormData): BaseResults {
  const largeur = data.largeur; // m
  const longueur = data.longueur; // m
  const h = data.epaisseur; // m
  const fissuration = data.fissuration; // coefficient de fissuration
  const Pu = data.Pu; // kN/m²
  const Pser = data.Pser; // kN/m²
  const fc28 = data.fc28; // MPa
  const fe = data.fe; // MPa

  //
  // Dalle things
  //

  const alpha = largeur / longueur; // ratio largeur/longueur

  let Mx = 0;
  let My = 0;
  let Vx = 0;
  let Vy = 0;

  if (alpha < 0.4 ) {
    Mx = (Pu * largeur ** 2) / 8; // kN m
    My = 0 ; // kN m
    Vx = (Pu * largeur ) / 2; // kN
    Vy = 0; // kN
  }

  else {
    const mux = 1 / ( 8 * ( 1 + 2.4 * alpha**3 ));
    const muy = Math.max( 0.25, alpha**3 * ( 1.9 - 0.9 * alpha ));
    Mx = mux * Pu * largeur ** 2; // kN m
    My = muy * Mx; // kN m
    Vx = ( Pu * largeur ) / 2 * 1 / ( 1 + alpha / 2 ); // kN
    Vy = ( Pu * largeur ) / 3; // kN
  }

  //
  // Calcul des sections de ferraillage
  //

  const b = largeur; // m
  const d = 0.9 * h; // m
  const dprime = 0.1 * h; // m
  const fbu = (0.85*fc28)/(1.5) // MPa
  
  let muU = 0;

  let alphaL = 0.668
  let muL = 0.392;

  let Astx = 0;
  let Ascx = 0;
  let Asty = 0;
  let Ascy = 0;

  let message = "";

  if (fe === 500) {
    alphaL = 0.617;
    muL = 0.371;
  }

  //
  // Etat limite ultime : ELU pour Mx
  //

  muU = Mx / (b*d**2 * fbu * 1000);

  if (muU < 0.186 || muU < muL) {

    const fsu = fe/1.15; // MPa
    const alphaU = 1.25*(1-Math.sqrt(1-2*muU));
    const Z = d*(1-0.4*alphaU);
    Astx = (Mx) / (fsu * Z *1000);
    Ascx = 0;

  }

  else {

    const sigmaSC = fe/1.15; // MPa
    const Mr = muL*b*d**2*fbu*1000; // kNm
    const Z = d*(1 - 0.4*alphaL);
    Ascx = (Mx - Mr) / ((d-dprime)*sigmaSC * 1000);
    Astx = (Mr/(Z) + (Mx-Mr)/(d-dprime))*(1.15/(fe * 1000));

  }

  Astx = Astx * 10000; // Convert m² to cm²
  Ascx = Ascx * 10000; // Convert m² to cm²

  //
  // Etat limite ultime : ELU pour My
  //

  muU = My / (b*d**2 * fbu * 1000);

  if (muU < 0.186 || muU < muL) {

    const fsu = fe/1.15; // MPa
    const alphaU = 1.25*(1-Math.sqrt(1-2*muU));
    const Z = d*(1-0.4*alphaU);
    Asty = (My) / (fsu * Z *1000);
    Ascy = 0;

  }

  else {

    const sigmaSC = fe/1.15; // MPa
    const Mr = muL*b*d**2*fbu*1000; // kNm
    const Z = d*(1 - 0.4*alphaL);
    Ascy = (My - Mr) / ((d-dprime)*sigmaSC * 1000);
    Asty = (Mr/(Z) + (My-Mr)/(d-dprime))*(1.15/(fe * 1000));

  }

  Asty = Asty * 10000; // Convert m² to cm²
  Ascy = Ascy * 10000; // Convert m² to cm²

  //
  // Effort tranchant
  //

  // Armatures d'âme

  const Vu = Math.max( Vx, Vy);

  if (Vu / (b * d) >= 0.07 * fc28 / 1.5)
  {
    message = "Pas d'armatures d'âme nécessaires."; 
  }
  else {
    message = "Redimensionne la section pour ne pas avoir des armatures d'âme.";
  }

  // Section minimales

  let Axmin = 0;
  let Aymin = 0;

  if (fe === 400) 
  {
    Aymin = 8*h; // cm²
  }
  else if (fe === 500) 
  {
    Aymin = 6*h; // cm²
  }

  Axmin = ( 3 - alpha ) / 2 * Aymin; // cm²

  // Espacement maximal

  let Stx = 0;
  let Sty = 0;  

  if (fissuration === 'peu nuisible') 
  {
    Stx = Math.min(3*h, 0.33); // m
    Sty = Math.min(4*h, 0.45); // m
  }
  else if (fissuration === 'prejudiciable') 
  {
    Stx = Math.min(2*h, 0.25); // m
    Sty = Stx; // m
  }
  else if (fissuration === 'tres prejudiciable') 
  {
    Stx = Math.min(1.5*h, 0.20); // m
    Sty = Stx; // m
  }

  return {
    Astx: parseFloat(Astx.toFixed(2)),
    Ascx: parseFloat(Ascx.toFixed(2)),
    Asty: parseFloat(Asty.toFixed(2)),
    Ascy: parseFloat(Ascy.toFixed(2)),
    Stx: parseFloat(Stx.toFixed(2)),
    Sty: parseFloat(Sty.toFixed(2)),
    Axmin: parseFloat(Axmin.toFixed(2)),
    Aymin: parseFloat(Aymin.toFixed(2)),
    message: message,
  };
}
