export interface FerrFormData {
  Nu: number;
  largeur: number;
}

export interface FerrResults {
  asq: number;
  bsq: number;
  a: number;
  b: number;
}

export function calculerFerrResultats(data: FerrFormData): FerrResults {  
    
    const Nu = data.Nu; // kN
    const largeur = data.largeur; // cm

    let asq = 0;
    let bsq = 0;
    let a = 0;
    let b = 0;

    const S = Nu / (1000 * 18) ; // formule forfitaire avec Nu en MN

    // Carré
    
    asq = Math.sqrt(S) * 100; // m to cm
    bsq = asq;

    // Rectangle

    a = largeur / 100;
    b = S / a;
    
    a = a * 100;
    b = b * 100;

    a = Math.ceil(a / 5) * 5;
    b = Math.ceil(b / 5) * 5;

    asq = Math.ceil(asq / 5) * 5;
    bsq = Math.ceil(bsq / 5) * 5;

    a = Math.max(25, a);
    b = Math.max(25, b);
    asq = Math.max(25, asq);
    bsq = Math.max(25, bsq);

    return {
    asq: parseFloat(asq.toFixed(2)),
    bsq: parseFloat(bsq.toFixed(2)),
    a: parseFloat(a.toFixed(2)),
    b: parseFloat(b.toFixed(2)),
    };
}