import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService],
})
export class ToastComponent {
  constructor(private readonly _messageService: MessageService) {}

  showSuccess(summary: string, detail: string, life: number = 3000) {
    this._messageService.add({
      severity: 'success',
      summary,
      detail,
      life,
    });
  }

  showError(summary: string, detail: string, life: number = 3000) {
    this._messageService.add({
      severity: 'error',
      summary,
      detail,
      life,
    });
  }

  showInfo(summary: string, detail: string, life: number = 3000) {
    this._messageService.add({
      severity: 'info',
      summary,
      detail,
      life,
    });
  }

  showWarn(summary: string, detail: string, life: number = 3000) {
    this._messageService.add({
      severity: 'warn',
      summary,
      detail,
      life,
    });
  }

  clear() {
    this._messageService.clear();
  }
}
