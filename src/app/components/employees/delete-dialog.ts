import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialog {
  dialogRef = inject(MatDialogRef<DeleteDialog>);
  data = inject(MAT_DIALOG_DATA);
  userName = this.data.name;
}
