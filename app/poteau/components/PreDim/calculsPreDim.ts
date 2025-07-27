export interface PreDimFormData {
  Nu: number;
  largeur: number;
}

export interface PreDimResults {
  asq: number;
  bsq: number;
  a: number;
  b: number;
}

export function calculerPreDimResultats(data: PreDimFormData): PreDimResults {  
    
    const Nu = data.Nu; // kN
    const largeur = data.largeur; // cm

    let asq = 0;
    let bsq = 0;
    let a = 0;
    let b = 0;

    const S = Nu / (1000 * 10) ; // formule forfitaire avec Nu en MN

    // Carré
    
    asq = Math.sqrt(S) * 100; // m to cm
    bsq = asq;

    // Rectangle

    a = largeur / 100;
    b = S / a;
    
    a = a * 100;
    b = b * 100;

    a = Math.round(a / 5) * 5;
    b = Math.round(b / 5) * 5;

    asq = Math.round(asq / 5) * 5;
    bsq = Math.round(bsq / 5) * 5;

    return {
    asq: parseFloat(asq.toFixed(2)),
    bsq: parseFloat(bsq.toFixed(2)),
    a: parseFloat(a.toFixed(2)),
    b: parseFloat(b.toFixed(2)),
    };
}