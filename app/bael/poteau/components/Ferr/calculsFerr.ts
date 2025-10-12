export interface FerrFormData {
  As: number;
}

export interface FerrResults {
  verification: string;
}

export function calculerFerrResultats(data: FerrFormData): FerrResults {  
    
    const As = data.As; // cm2

    console.log(As);

    const verification = 'test';

    return {
    verification: verification,

    };
}