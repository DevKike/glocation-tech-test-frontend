import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../modules/shared/services/http.service';
import { API_ENDPOINT } from '../../modules/shared/constants/api-endpoint.constant';
import {
  IProject,
  ICreateProject,
  IUpdateProject,
} from '../../modules/shared/interfaces/project.interface';
import { IApiResponse } from '../../modules/shared/interfaces/api-response.interface';
import { delay, firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../../modules/shared/components/confirm-dialog/confirm-dialog.component';
import { ToastComponent } from '../../modules/shared/components/toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;
  @ViewChild(ToastComponent) toast!: ToastComponent;

  projects: IProject[] = [];
  displayCreateDialog: boolean = false;
  displayEditDialog: boolean = false;
  selectedProject: IProject | null = null;
  isLoading: boolean = false;

  headerMenuItems: any[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Projects',
      icon: 'pi pi-briefcase',
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-bar',
    },
  ];

  constructor(
    private readonly _httpService: HttpService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.isLoading = true;

    try {
      const response = await firstValueFrom(
        this._httpService.get<IApiResponse<IProject[]>>(
          API_ENDPOINT.PROJECT.GET_ALL
        )
      );

      this.projects = [...response.data];

      this.cdr.detectChanges();

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.isLoading = false;
    } catch (err) {
      console.error('Error fetching projects:', err);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.isLoading = false;
    }
  }

  openCreateDialog() {
    this.displayCreateDialog = true;
  }

  async handleCreate(projectData: ICreateProject | IUpdateProject) {
    this.isLoading = true;
    try {
      await firstValueFrom(
        this._httpService.post<ICreateProject, IApiResponse<IProject>>(
          API_ENDPOINT.PROJECT.CREATE,
          projectData as ICreateProject // ✅ Cast a ICreateProject
        )
      );
      this.displayCreateDialog = false;

      this.isLoading = false;
      await this.getData();

      this.toast.showSuccess('Success', 'Project created successfully');
    } catch (err) {
      console.error('Error creating project:', err);
      this.toast.showError('Error', 'Failed to create project');
      this.isLoading = false;
    }
  }

  handleCancelCreate() {
    this.displayCreateDialog = false;
  }

  handleEdit(project: IProject) {
    this.selectedProject = project;
    this.displayEditDialog = true;
  }

  async handleUpdate(projectData: ICreateProject | IUpdateProject) {
    if (!this.selectedProject) return;

    try {
      await firstValueFrom(
        this._httpService.patch<IUpdateProject, IApiResponse<IProject>>(
          `${API_ENDPOINT.PROJECT.UPDATE}/${this.selectedProject.id}`,
          projectData as IUpdateProject
        )
      );

      this.displayEditDialog = false;
      this.selectedProject = null;

      await this.getData();

      this.toast.showSuccess('Success', 'Project updated successfully');
    } catch (err) {
      console.error('❌ Error updating project:', err);
      this.toast.showError('Error', 'Failed to update project');
    }
  }

  handleCancelEdit() {
    this.displayEditDialog = false;
    this.selectedProject = null;
  }

  handleDelete(project: IProject) {
    this.confirmDialog.confirmationService.confirm({
      header: 'Delete Project',
      message: `Are you sure you want to delete "${project.name}"? This action cannot be undone.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.confirmDelete(project);
      },
      reject: () => {
        this.toast.showInfo('Cancelled', 'Delete operation cancelled');
      },
    });
  }

  async confirmDelete(project: IProject) {
    try {
      await firstValueFrom(
        this._httpService.delete<IApiResponse<void>>(
          `${API_ENDPOINT.PROJECT.DELETE}/${project.id}`
        )
      );

      await this.getData();

      this.toast.showSuccess(
        'Success',
        `Project "${project.name}" deleted successfully`
      );
    } catch (err) {
      console.error('Error deleting project:', err);
      this.toast.showError('Error', 'Failed to delete project');
      this.isLoading = false;
    }
  }
  getProjectsByStatus(status: string): number {
    return this.projects.filter((p) => p.status === status).length;
  }

  getSuccessRate(): number {
    if (this.projects.length === 0) return 0;
    const finished = this.getProjectsByStatus('Finished');
    return Math.round((finished / this.projects.length) * 100);
  }
}
