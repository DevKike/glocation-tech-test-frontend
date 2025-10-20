import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() visible: boolean = false;
  @Input() message: string = 'Loading...';
  @Input() overlay: boolean = true;
  @Input() strokeWidth: string = '3';
  @Input() animationDuration: string = '2s';
}
