export interface IIntern {
  index: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  country: string;
  city: string;
  email: string;
  telegram: string;
  phone: string;
  internship_spec: string;
  englishLevel: string;
  education?: string;
  about?: string;
  skills?: string[];
  applicationDate?: Date;
  finalStatus?: 'success' | 'failed' | 'in-progress';
  startDate?: Date | null;
  endDate?: Date | null;
  rejectionReason?: string;
  selected?: boolean;
}

export interface InternFormData {
  'personal-info': {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    country: string;
    city: string;
  };
  'contact-info': {
    email: string;
    telegram: string;
    phone: string;
  };
  'education-info': {
    education: string;
    about: string;
    internship_spec: string;
    englishLevel: string;
    skills: string[];
  };
  'internship-details'?: {
    applicationDate?: Date;
    finalStatus?: 'success' | 'failed' | 'in-progress';
    startDate?: Date | null;
    endDate?: Date | null;
    rejectionReason?: string;
  };
}
