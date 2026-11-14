export interface FormData {
  hauteurPoteau: number;
  facteurFlambement: number;
  largeur: number;
  longueur: number;
  Nu: number;
  fc28: number;
  fe: number;
  dispositionSismique?: string;
}

export interface BaseResults {
  Ath: number;
  As: number;
  Amin: number;
  AminRps?: number;
  dispositionSismique?: string;
  Amax: number;
  lambda: number;
  largeur: number;
  longueur: number;
  h: number;
  Nu: number;
  fc28: number;
  fe: number;
  Lf: number;
  f: number;
  ratio: number;
}

export function calculerBaseResultats(data: FormData): BaseResults {
  const h = data.hauteurPoteau; // m
  const f = data.facteurFlambement;
  const largeur = data.largeur; // cm
  const longueur = data.longueur; // cm
  const Nu = data.Nu; // kN
  const fc28 = data.fc28; // MPa
  const fe = data.fe; // MPa

  const Lf = h * f;

  const a = largeur / 100; // m
  const b = longueur / 100; // m

  const lambda = 2 * Math.sqrt(3) * (Lf) / a;
  let alpha = 0;
  if (lambda <= 50) {
    alpha = 0.85 / (1 + 0.2 * (lambda / 35) ** 2);
  } else if (lambda > 50 && lambda <= 70) {
    alpha = 0.6 * (50 / lambda) ** 2;
  }
  const Br = (a - 0.02) * (b - 0.02);
  let Ath = (Nu / (1000 * alpha) - (Br * fc28) / (0.9 * 1.5)) * (1.15 / fe); // m² théorique armature
  Ath = Ath * 10000; // cm²

  const A1 = 0.2/100 * a * b * 10000;
  const A2 = 4 * (2 * (a + b));
  const Amin = Math.max(A1, A2);
  const Amax = 5/100 * a * b * 10000;

  const isRps = data.dispositionSismique === 'rps2011';
  let AminRps: number | undefined = undefined;
  let As: number;

  if (isRps) {
    AminRps = (1 / 100) * (largeur * longueur); // 1% de la section de béton
    As = Math.min(Amax, Math.max(Ath, Amin, AminRps));
  } else {
    As = Math.min(Amax, Math.max(Ath, Amin));
  }

  const ratio = As/(longueur * largeur)*100;

  return {
    lambda: parseFloat(lambda.toFixed(2)),
    Ath: parseFloat(Ath.toFixed(2)),
    Amin: parseFloat(Amin.toFixed(2)),
    ...(AminRps !== undefined ? { AminRps: parseFloat(AminRps.toFixed(2)) } : {}),
    dispositionSismique: data.dispositionSismique || 'aucun',
    Amax: parseFloat(Amax.toFixed(2)),
    As: parseFloat(As.toFixed(2)),
    largeur: parseFloat(largeur.toFixed(2)),
    longueur: parseFloat(longueur.toFixed(2)),
    h: parseFloat(h.toFixed(2)),
    Nu: parseFloat(Nu.toFixed(2)),
    fc28: parseFloat(fc28.toFixed(2)),
    fe: parseFloat(fe.toFixed(2)),
    Lf: parseFloat(Lf.toFixed(2)),
    f: parseFloat(f.toFixed(3)),
    ratio: parseFloat(ratio.toFixed(2)),
  };
}