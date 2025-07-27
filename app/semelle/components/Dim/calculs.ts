export interface FormData {
  largeur: number;
  longueur: number;
  largeurPoteau: number;
  longueurPoteau: number;
  hauteur: number;
  contrainte: number;
  Nu: number;
  Nser: number;
  fe: number;
}

export interface BaseResults {
  Asx: number;
  Asy: number;

  message?: string;
}

export function calculerBaseResultats(data: FormData): BaseResults {
  const A = data.largeur; // m
  const B = data.longueur; // m
  const a = data.largeurPoteau / 100; // m
  const b = data.longueurPoteau / 100; // m
  const d = data.hauteur; // m
  const Nu = data.Nu / 1000; // MN
  const Nser = data.Nser / 1000; // MN
  const contrainte = data.contrainte; // MPa
  const fe = data.fe; // MPa

  const h = d + 0.05; // m
  const fsu = fe/1.15; // MPa

  const Asx = Nu * (A-a)/(8*d*fsu) * 10000; // cm²
  const Asy = Nu * (B-b)/(8*d*fsu) * 10000; // cm²
  let message = '';

  const Pp = A*B*h*25/1000; // MN
  
  if ((Nser + Pp) / (A * B) > contrainte) 
  {
    message = "La contrainte admissible du sol est dépassée. Veuillez redimentionner la section de la semelle.";
  }
  else if ((Nser + Pp) / (A * B) <= contrainte) 
  {
    message = "La contrainte admissible du sol est vérifiée.";
  }

  return {
    Asx: parseFloat(Asx.toFixed(2)),
    Asy: parseFloat(Asy.toFixed(2)),
    message: message,
  };
}
