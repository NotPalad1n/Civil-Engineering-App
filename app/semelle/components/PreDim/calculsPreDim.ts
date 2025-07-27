export interface PreDimFormData {
  largeurPoteau: number;
  longueurPoteau: number;
  contrainte: number;
  Nser: number;
}

export interface PreDimResults {
  A: number;
  B: number;
  D: number;
  H: number;
}

export function calculerPreDimResultats(data: PreDimFormData): PreDimResults {  
    
    const a = data.largeurPoteau / 100; // m
    const b = data.longueurPoteau / 100; // m
    const sigma = data.contrainte; // MPa
    const Nser = data.Nser / 1000; // MN

    let A = 0;
    let B = 0;
    let D = 0;
    let H = 0;

    B = Math.sqrt(b / a * Nser / sigma);
    A = Math.sqrt(a / b * Nser / sigma);

    const d1 = Math.min(A - a, B - b);
    const d2 = Math.min((A - a) / 4, (B - b) / 4);

    D = Math.min( d1, d2);

    A = Math.ceil(A / 0.05) * 0.05;
    B = Math.ceil(A / 0.05) * 0.05;
    D = Math.ceil(D / 0.05) * 0.05;

    H = D + 0.05;

    return {
      A: parseFloat(A.toFixed(2)),
      B: parseFloat(B.toFixed(2)),
      D: parseFloat(D.toFixed(2)),
      H: parseFloat(H.toFixed(2)),
    };
}