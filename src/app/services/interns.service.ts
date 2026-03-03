import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IIntern } from '../components/interns-list/interns-list.component';

@Injectable({
  providedIn: 'root',
})
export class InternService {
  private mockInterns: IIntern[] = [
    {
      index: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      birthDate: new Date('1998-05-15'),
      gender: 'Male',
      country: 'Беларусь',
      city: 'Минск',
      phone: '+375291234567',
      email: 'ivan.ivanov@example.com',
      telegram: '@ivan_ivanov',
      internship_spec: 'Angular',
      englishLevel: 'Intermediate',
      education: 'Высшее, БГУИР',
      about: 'Люблю программировать',
      skills: ['JavaScript', 'TypeScript', 'Angular'],
      applicationDate: new Date('2026-01-15'),
      finalStatus: 'success',
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-05-01'),
      rejectionReason: '',
    },
    {
      index: 2,
      firstName: 'Петр',
      lastName: 'Петров',
      birthDate: new Date('1999-08-23'),
      gender: 'Male',
      country: 'Беларусь',
      city: 'Гомель',
      phone: '+375297654321',
      email: 'petr.petrov@example.com',
      telegram: '@petr_petrov',
      internship_spec: 'React',
      englishLevel: 'Upper-Intermediate / Advanced',
      education: 'Высшее, ГГУ',
      about: 'React разработчик',
      skills: ['JavaScript', 'React', 'Redux'],
      applicationDate: new Date('2026-01-20'),
      finalStatus: 'in-progress',
      startDate: new Date('2026-02-15'),
      endDate: null,
      rejectionReason: '',
    },
    {
      index: 3,
      firstName: 'Мария',
      lastName: 'Сидорова',
      birthDate: new Date('2000-11-03'),
      gender: 'Female',
      country: 'Беларусь',
      city: 'Брест',
      phone: '+375331234567',
      email: 'maria.sidorova@example.com',
      telegram: '@maria_s',
      internship_spec: 'Python',
      englishLevel: 'Pre-Intermediate',
      education: 'Студент, БрГТУ',
      about: 'Интересуюсь Data Science',
      skills: ['Python', 'Pandas', 'NumPy'],
      applicationDate: new Date('2026-01-10'),
      finalStatus: 'failed',
      startDate: null,
      endDate: null,
      rejectionReason: 'Недостаточный уровень английского',
    },
    {
      index: 4,
      firstName: 'Алексей',
      lastName: 'Смирнов',
      birthDate: new Date('1997-03-12'),
      gender: 'Male',
      country: 'Беларусь',
      city: 'Витебск',
      phone: '+375447771122',
      email: 'alex.smirnov@example.com',
      telegram: '@alex_smirnov',
      internship_spec: 'Angular',
      englishLevel: 'Intermediate',
      education: 'Высшее, ВГУ',
      about: 'Full-stack разработчик',
      skills: ['JavaScript', 'TypeScript', 'Angular', 'Node.js'],
      applicationDate: new Date('2026-02-01'),
      finalStatus: 'in-progress',
      startDate: new Date('2026-02-20'),
      endDate: null,
      rejectionReason: '',
    },
    {
      index: 5,
      firstName: 'Елена',
      lastName: 'Козлова',
      birthDate: new Date('2001-07-19'),
      gender: 'Female',
      country: 'Беларусь',
      city: 'Гродно',
      phone: '+375251234567',
      email: 'elena.kozlova@example.com',
      telegram: '@elena_k',
      internship_spec: 'React',
      englishLevel: 'Beginner / Elementary',
      education: 'Студент, ГрГУ',
      about: 'Изучаю frontend',
      skills: ['HTML', 'CSS', 'JavaScript'],
      applicationDate: new Date('2026-01-05'),
      finalStatus: 'failed',
      startDate: null,
      endDate: null,
      rejectionReason: 'Не пройдено тестовое задание',
    },
  ];

  constructor() {}

  getAllInterns(): Observable<IIntern[]> {
    return of(this.mockInterns);
  }

  getInternById(id: number): Observable<IIntern | undefined> {
    const intern = this.mockInterns.find((i) => i.index === id);
    return of(intern);
  }

  deleteInterns(ids: number[]): Observable<boolean> {
    this.mockInterns = this.mockInterns.filter((i) => !ids.includes(i.index));
    return of(true);
  }
}
