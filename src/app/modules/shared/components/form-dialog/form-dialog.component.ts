import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() onSave = new EventEmitter<
    Partial<ICreateProject | IUpdateProject>
  >();
  @Output() onCancel = new EventEmitter<void>();

  projectForm!: FormGroup;

  statusOptions = [{ label: 'Finished', value: PROJECT_STATUS.FINISHED }];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(70),
        ],
      ],
      status: [PROJECT_STATUS.IN_PROGRESS],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible) {
      if (this.mode === 'edit' && this.project) {
        this.projectForm.patchValue({
          name: this.project.name,
          description: this.project.description,
          status: this.project.status,
        });
        this.projectForm.markAsPristine();
      } else if (this.mode === 'create') {
        this.projectForm.reset({
          name: '',
          description: '',
          status: PROJECT_STATUS.IN_PROGRESS,
        });
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
      return this.projectForm.valid;
    } else {
      return this.projectForm.valid && this.projectForm.dirty;
    }
  }

  get canChangeStatus(): boolean {
    return (
      this.mode === 'edit' && this.project?.status !== PROJECT_STATUS.FINISHED
    );
  }

  getErrorMessage(fieldName: string): string {
    const control = this.projectForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) {
      return `${
        fieldName === 'name' ? 'Project name' : 'Description'
      } is required`;
    }

    if (control.errors['minlength']) {
      return `${
        fieldName === 'name' ? 'Project name' : 'Description'
      } must be at least 5 characters`;
    }

    return '';
  }

  save() {
    if (!this.isFormValid) return;

    if (this.mode === 'create') {
      const createData: ICreateProject = {
        name: this.projectForm.value.name,
        description: this.projectForm.value.description,
      };

      this.onSave.emit(createData);
    } else {
      const changedData: Partial<IUpdateProject> = {};

      if (this.projectForm.get('name')?.dirty) {
        changedData.name = this.projectForm.value.name;
      }

      if (this.projectForm.get('description')?.dirty) {
        changedData.description = this.projectForm.value.description;
      }

      if (this.projectForm.get('status')?.dirty) {
        changedData.status = this.projectForm.value.status;
      }

      this.onSave.emit(changedData);
    }

    this.closeDialog();
  }

  cancel() {
    this.onCancel.emit();
    this.closeDialog();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.projectForm.reset();
  }

  onHide() {
    this.closeDialog();
  }
}
