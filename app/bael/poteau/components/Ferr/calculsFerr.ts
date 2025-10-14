export interface FerrFormData {
  As: number;
  elements: ElementData[];
}

export interface ElementData {
  id: string;
  nombre: string;
  diametre: string;
}

export interface FerrResults {
  As: number;
  AsFourni: number;
  verification: string;
}

export function calculerFerrResultats(data: FerrFormData): FerrResults {  
    
    const As = data.As; // cm2
    const elements = data.elements;
    let verification = '';

    const AsFourni = elements.reduce((sum, el) => {
      const n = Number(el.nombre);
      const d = Number(el.diametre);
      if (!isNaN(n) && !isNaN(d)) {
        return sum + n * (Math.PI * (d / 10) ** 2 / 4); // cm²
      }
      return sum;
    }, 0);

    console.log(As);
    console.log(elements);

    if (As>AsFourni) {
      verification = "Section non verifiée";
    }
    else {
      verification = "Section verifiée";
    }

    return {
      As: parseFloat(As.toFixed(2)),
      AsFourni: parseFloat(AsFourni.toFixed(2)),
      verification: verification,
    };
}