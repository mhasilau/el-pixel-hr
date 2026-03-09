import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { ViewChild, AfterViewInit } from '@angular/core';
import { InternService } from '../../services/interns.service';
import { Router } from '@angular/router';
import { IIntern } from '../intern.model';
import { delay } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
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
    MatMenuModule,
    CdkDropList,
    CdkDrag,
    MatCheckboxModule,
    LoaderComponent,
  ],
})
export class InternsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private internService = inject(InternService);
  private router = inject(Router);

  isLoading = signal<boolean>(false);

  displayedColumns: string[] = [
    'select',
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
    'actions',
  ];
  dataSource = new MatTableDataSource<IIntern>([]);
  selection = new SelectionModel<IIntern>(true, []);

  ngOnInit(): void {
    this.loadInterns();
  }
  loadInterns() {
    this.isLoading.set(true);
    this.internService
      .getAllInterns()
      .pipe(delay(Math.random() * 2500 + 500))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
      })
      .add(() => this.isLoading.set(false));
  }

  openInternEditForm(id: number): void {
    this.router.navigate(['/internship/edit', id]);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  isAnySelected() {
    return this.selection.selected.length > 0;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(event: MatCheckboxChange): void {
    if (event.checked) {
      this.selection.select(...this.dataSource.data);
    } else {
      this.selection.clear();
    }
  }
  toggleRow(event: MatCheckboxChange, row: IIntern): void {
    if (event.checked) {
      this.selection.select(row);
    } else {
      this.selection.toggle(row);
    }
  }
  getSelectedCount() {
    return this.selection.selected.length;
  }

  deleteSelected() {
    const selectedIds = this.selection.selected.map((s) => s.index);
    if (selectedIds.length === 0) return;
    this.isLoading.set(true);
    this.internService
      .deleteInterns(selectedIds)
      .pipe(delay(Math.random() * 2500 + 500))
      .subscribe({
        next: (success) => {
          if (success) {
            this.loadInterns();
            this.selection.clear();
          }
        },
      })
      .add(() => this.isLoading.set(false));
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
