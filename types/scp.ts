export interface Addendum {
  title: string;
  content: string;
}

export interface SCP {
  id: string;
  name: string;
  objectClass: string;
  containmentProcedures: string;
  description: string;
  image: string;
  addendums: Addendum[];
}

export interface ObjectClass {
  id: string;
  name: string;
  description: string;
}

export interface Facility {
  name: string;
  description: string;
  location: string;
}

export interface PersonnelType {
  title: string;
  description: string;
}

export interface FoundationInfo {
  about: string;
  mission: string;
  facilities: Facility[];
  personnel: PersonnelType[];
}