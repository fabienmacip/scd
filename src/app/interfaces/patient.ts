export interface Patient {
  id?: string;
  lastName: string;
  firstName: string;
  email?: string;
  password?: string;
  dob: string;
  sex: string;
  height?: number;
  weight?: number;
  diet?: string;
  dietNormal? : boolean;
  dietVegan? : boolean;
  dietVegetarien? : boolean;
  dietPaleo? : boolean;
  dietDiabete? : boolean;
  dietProteine? : boolean;
  allergenCacao? : boolean;
  allergenLait? : boolean;
  allergenCacahuete? : boolean;
  allergenGluten? : boolean;
}
