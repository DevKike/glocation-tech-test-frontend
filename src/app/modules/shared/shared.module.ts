import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { TableComponent } from './components/table/table.component';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from './components/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastComponent } from './components/toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    HeaderComponent,
    FormDialogComponent,
    ButtonComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    MenubarModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    Textarea,
    ProgressSpinnerModule,
    BlockUIModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
  ],
  exports: [
    CardComponent,
    TableComponent,
    HeaderComponent,
    FormDialogComponent,
    ButtonComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    ToastComponent,
  ],
})
export class SharedModule {}
