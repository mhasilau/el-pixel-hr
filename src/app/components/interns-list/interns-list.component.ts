import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

export interface IIntern {
  index: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  email: string;
  telegram: string;
  internship_spec: string;
  englishLevel: string;
  applicationDate: Date;
  finalStatus: 'success' | 'failed' | 'in-progress';
  startDate: Date | null;
  endDate: Date | null;
  rejectionReason: string;
}

@Component({
  selector: 'app-interns-list',
  standalone: true,
  templateUrl: './interns-list.component.html',
  styleUrls: ['./interns-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    CdkDropList,
    CdkDrag,
  ],
})
export class InternsListComponent {
  displayedColumns: string[] = [
    'index',
    'firstName',
    'lastName',
    'birthDate',
    'phone',
    'email',
    'telegram',
    'internship_spec',
    'englishLevel',
    'applicationDate',
    'finalStatus',
    'startDate',
    'endDate',
    'rejectionReason',
  ];
  interns: IIntern[] = [
    {
      index: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      birthDate: new Date('1998-05-15'),
      phone: '+375291234567',
      email: 'ivan.ivanov@example.com',
      telegram: '@ivan_ivanov',
      internship_spec: 'Angular',
      englishLevel: 'Intermediate',
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
      phone: '+375297654321',
      email: 'petr.petrov@example.com',
      telegram: '@petr_petrov',
      internship_spec: 'React',
      englishLevel: 'Upper-Intermediate / Advanced',
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
      phone: '+375331234567',
      email: 'maria.sidorova@example.com',
      telegram: '@maria_s',
      internship_spec: 'Python',
      englishLevel: 'Pre-Intermediate',
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
      phone: '+375447771122',
      email: 'alex.smirnov@example.com',
      telegram: '@alex_smirnov',
      internship_spec: 'Angular',
      englishLevel: 'Intermediate',
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
      phone: '+375251234567',
      email: 'elena.kozlova@example.com',
      telegram: '@elena_k',
      internship_spec: 'React',
      englishLevel: 'Beginner / Elementary',
      applicationDate: new Date('2026-01-05'),
      finalStatus: 'failed',
      startDate: null,
      endDate: null,
      rejectionReason: 'Не пройдено тестовое задание',
    },
  ];
  dataSource = new MatTableDataSource(this.interns);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
