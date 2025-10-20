import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  providers: [ConfirmationService],
})
export class ConfirmDialogComponent {
  constructor(public readonly confirmationService: ConfirmationService) {}
}
