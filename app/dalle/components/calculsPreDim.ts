export interface PreDimFormData {
  longueur: number;
  largeur: number;
  forme: string;
}

export interface PreDimResults {
  h: number;
}

export function calculerPreDimResultats(data: PreDimFormData): PreDimResults {  
    
    const ly = data.longueur;
    const lx = data.largeur;
    const alpha = lx/ly;
    const forme = data.forme;

    let h = 0;

    if (alpha <= 0.4) {
        if(forme === 'Isolée'){
            h = lx/20 * 100;
        }
        else{
            h = lx/25 * 100;
        }
    }
    else {
        if(forme === 'Isolée'){
            h = lx/30 * 100;
        }
        else{
            h = lx/40 * 100;
        }
    }

    h = Math.ceil(h / 5) * 5;

    return {
    h: parseFloat(h.toFixed(2)),
    };
}