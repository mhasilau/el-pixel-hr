import { Component, OnInit, inject } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { ViewChild, AfterViewInit } from '@angular/core';
import { InternService } from '../../services/interns.service';
import { Router } from '@angular/router';
import { IIntern } from '../intern.model';
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
  ],
})
export class InternsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private internService = inject(InternService);

  private router = inject(Router);

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
    this.internService.getAllInterns().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  navigateToApplication(id: number): void {
    this.router.navigate(['/internship/edit', id]);
  }
  createIntern(): void {
    this.router.navigate(['/internship/create']);
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

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  getSelectedCount() {
    return this.selection.selected.length;
  }

  deleteSelected() {
    const selectedIds = this.selection.selected.map((s) => s.index);
    if (selectedIds.length === 0) return;

    this.internService.deleteInterns(selectedIds).subscribe({
      next: (success) => {
        if (success) {
          this.loadInterns();
          this.selection.clear();
        }
      },
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
