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
