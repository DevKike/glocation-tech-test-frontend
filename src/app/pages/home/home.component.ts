import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../modules/shared/services/http.service';
import { API_ENDPOINT } from '../../modules/shared/constants/api-endpoint.constant';
import {
  IProject,
  ICreateProject,
  IUpdateProject,
  IGetProjectResponse,
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
  feedback: IGetProjectResponse['feedback'] | null = null;
  displayCreateDialog: boolean = false;
  displayEditDialog: boolean = false;
  selectedProject: IProject | null = null;
  isLoading: boolean = false;

  statusChartData: any;
  projectsOverTimeData: any;
  completionRateData: any;

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
        this._httpService.get<IApiResponse<IGetProjectResponse>>(
          API_ENDPOINT.PROJECT.GET_ALL
        )
      );

      this.projects = response.data.projects;
      this.feedback = response.data.feedback;

      this.prepareChartData();

      this.cdr.detectChanges();

      await new Promise((resolve) => setTimeout(resolve, 900));
      this.isLoading = false;
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      this.isLoading = false;
    }
  }

  prepareChartData() {
    if (!this.feedback) return;

    this.statusChartData = {
      labels: ['Completed', 'In Progress'],
      datasets: [
        {
          data: [
            this.feedback.stats.finishedPercentage,
            this.feedback.stats.inProgressPercentage,
          ],
          backgroundColor: ['#10b981', '#f59e0b', '#6366f1'],
          hoverBackgroundColor: ['#059669', '#d97706', '#4f46e5'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };

    this.projectsOverTimeData = {
      labels: ['Finished', 'In Progress'],
      datasets: [
        {
          label: 'Number of Projects',
          data: [
            this.getProjectsByStatus('Finished'),
            this.getProjectsByStatus('In progress'),
          ],
          backgroundColor: ['#10b981', '#f59e0b', '#6366f1'],
          borderColor: ['#059669', '#d97706', '#4f46e5'],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    };

    this.completionRateData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Completion Rate (%)',
          data: [20, 35, 55, this.feedback.stats.finishedPercentage],
          fill: true,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          tension: 0.4,
          pointBackgroundColor: '#667eea',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
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
          projectData as ICreateProject
        )
      );

      this.displayCreateDialog = false;
      this.isLoading = false;
      await this.getData();

      this.toast.showSuccess('Success', 'Project created successfully');
    } catch (err) {
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
      this.toast.showError('Error', 'Failed to delete project');
      this.isLoading = false;
    }
  }

  getProjectsByStatus(status: string): number {
    return this.projects.filter((p) => p.status === status).length;
  }
}
