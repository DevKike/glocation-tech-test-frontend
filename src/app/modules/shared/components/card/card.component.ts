import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() header: string = '';
  @Input() subheader: string = '';
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
  @Input() padding: string = '1rem';
}
