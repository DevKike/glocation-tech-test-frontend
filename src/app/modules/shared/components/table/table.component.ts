import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProject } from '../../interfaces/project.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() projects: IProject[] = [];
  @Output() editProject = new EventEmitter<IProject>();
  @Output() deleteProject = new EventEmitter<IProject>();

  onEdit(project: IProject) {
    this.editProject.emit(project);
  }

  onDelete(project: IProject) {
    this.deleteProject.emit(project);
  }
}
