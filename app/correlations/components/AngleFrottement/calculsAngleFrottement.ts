export interface AngleFrottementFormData {
  correlation: string;
  Pl: number;
  Ip: number;
}

export interface AngleFrottementResults {
  phi: number;
}

export function calculerAngleFrottementResultats(data: AngleFrottementFormData): AngleFrottementResults {  

    const correlation = data.correlation;
    const Pl = data.Pl / 1000; // Mpa
    const Ip = data.Ip;

    let phi = 0;

    if (correlation === 'Pl'){
        phi = 24 + 4 * (Math.log10(10*Pl/2.5)/Math.log10(2));
    }

    else if (correlation === 'Ip'){
        phi = Math.atan(0.21 + 8/(Ip+6)) * (180 / Math.PI);
    }
    return {
    phi: parseFloat(phi.toFixed(2)),
    };
}