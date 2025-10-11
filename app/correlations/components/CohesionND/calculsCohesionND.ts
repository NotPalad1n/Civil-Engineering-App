export interface CohesionNDFormData {
  correlation: string;
  Pl1: number;
  Pl2: number;
  IC: number;
}

export interface CohesionNDResults {
  Cu: number;
}

export function calculerCohesionNDResultats(data: CohesionNDFormData): CohesionNDResults {  

    const correlation = data.correlation;
    const Pl1 = data.Pl1; // kPa
    const Pl2 = data.Pl2; // kPa
    const IC = data.IC; // %

    let Cu = 0;

    if (correlation === 'Pl1'){
        if(Pl1 <= 300){
          Cu = Pl1/5.5;       
        }
        else if(Pl1 > 300 && Pl1 <= 1000){
          Cu = Pl1/12 + 30;
        }
        else if(Pl1 > 1000){
          Cu = Pl1/35 + 85;
        }
    }

    else if (correlation === 'Pl2'){
      Cu = 0.21*(Pl2/1000)**(0.75)*1000;
    }

    else if (correlation === 'IC'){
      Cu = 200*(IC/100)**(2);
    }

    return {
    Cu: parseFloat(Cu.toFixed(2)),
    };
}