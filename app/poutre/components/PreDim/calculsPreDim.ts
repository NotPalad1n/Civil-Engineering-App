export interface PreDimFormData {
  longueur: number;
  forme: string;
  chargement: string;
}

export interface PreDimResults {
  b: number;
  h: number;
  message: string;
}

export function calculerPreDimResultats(data: PreDimFormData): PreDimResults {  
    
    const l = data.longueur;
    const forme = data.forme;
    const chargement = data.chargement;

    const b = 25;
    const message = "Vous pouver ajuster b selon votre cas."
    let h = 0;

    if(forme === "Isolée"){
        if(chargement === "CC"){
            h = l/10 * 100;
        }
        else if(chargement === "CD"){
            h = l/12 * 100;
        }
        else{
            h = l/15 * 100;
        }
    }
    else{
        if(chargement === "CC"){
            h = l/12 * 100;
        }
        else if(chargement === "CD"){
            h = l/15 * 100;
        }
        else{
            h = l/20 * 100;
        }
    }

    h = Math.ceil(h / 5) * 5;

    return {
    b: parseFloat(b.toFixed(2)),
    h: parseFloat(h.toFixed(2)),
    message: message,
    };
}