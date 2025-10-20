import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ICreateProject,
  IProject,
  IUpdateProject,
} from '../../interfaces/project.interface';
import { PROJECT_STATUS } from '../../enums/project-status.enum';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() project: IProject | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<ICreateProject | IUpdateProject>();
  @Output() onCancel = new EventEmitter<void>();

  createFormData: ICreateProject = {
    name: '',
    description: '',
  };

  updateFormData: IUpdateProject = {
    name: '',
    description: '',
    status: PROJECT_STATUS.IN_PROGRESS,
  };

  statusOptions = [{ label: 'Finished', value: PROJECT_STATUS.FINISHED }];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible) {
      if (this.mode === 'edit' && this.project) {
        this.updateFormData = {
          name: this.project.name,
          description: this.project.description,
          status: this.project.status,
        };
      } else if (this.mode === 'create') {
        this.createFormData = {
          name: '',
          description: '',
        };
      }
    }
  }

  get dialogHeader(): string {
    return this.mode === 'create'
      ? 'Create New Project'
      : `Edit Project: ${this.project?.name || ''}`;
  }

  get isFormValid(): boolean {
    if (this.mode === 'create') {
      return (
        !!this.createFormData.name?.trim() &&
        !!this.createFormData.description?.trim()
      );
    } else {
      return (
        !!this.updateFormData.name?.trim() &&
        !!this.updateFormData.description?.trim() &&
        !!this.updateFormData.status
      );
    }
  }

  get canChangeStatus(): boolean {
    const result =
      this.mode === 'edit' && this.project?.status !== PROJECT_STATUS.FINISHED;

    return result;
  }

  save() {
    if (this.isFormValid) {
      const dataToSave =
        this.mode === 'create' ? this.createFormData : this.updateFormData;

      this.onSave.emit(dataToSave);
      this.closeDialog();
    }
  }

  cancel() {
    this.onCancel.emit();
    this.closeDialog();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  resetForm() {
    this.createFormData = {
      name: '',
      description: '',
    };
    this.updateFormData = {
      name: '',
      description: '',
      status: PROJECT_STATUS.IN_PROGRESS,
    };
  }

  onHide() {
    this.closeDialog();
  }
}
