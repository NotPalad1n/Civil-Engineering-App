export interface FormData {
  largeur: number;
  longueur: number;
  hauteur: number;
  fissuration: string;
  Mu: number;
  fc28: number;
  fe: number;
}

export interface BaseResults {
  longueur: number;
  largeur: number;
  h: number;
  fissuration: string;
  Mu: number;
  fc28: number;
  fe: number;
}

export function calculerBaseResultats(data: FormData): BaseResults {
  const longueur = data.longueur; // m
  const largeur = data.largeur; // cm
  const h = data.hauteur; // cm
  const fissuration = data.fissuration; // coefficient de fissuration
  const Mu = data.Mu; // kNm
  const fc28 = data.fc28; // MPa
  const fe = data.fe; // MPa



  return {
    longueur: parseFloat(longueur.toFixed(2)),
    largeur: parseFloat(largeur.toFixed(2)),
    h: parseFloat(h.toFixed(2)),
    fissuration: fissuration,
    Mu: parseFloat(Mu.toFixed(2)),
    fc28: parseFloat(fc28.toFixed(2)),
    fe: parseFloat(fe.toFixed(2)),
  };
}
