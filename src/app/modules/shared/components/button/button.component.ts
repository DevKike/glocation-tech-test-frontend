import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() severity:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'help'
    | 'contrast' = 'primary';
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Input() rounded: boolean = false;
  @Input() text: boolean = false;
  @Input() outlined: boolean = false;
  @Input() loading: boolean = false;
  @Output() onClick = new EventEmitter<Event>();

  get buttonClass(): string {
    let classes = [];

    if (this.severity !== 'primary') {
      classes.push(`p-button-${this.severity}`);
    }
    if (this.size === 'small') {
      classes.push('p-button-sm');
    } else if (this.size === 'large') {
      classes.push('p-button-lg');
    }

    if (this.rounded) {
      classes.push('p-button-rounded');
    }
    if (this.text) {
      classes.push('p-button-text');
    }
    if (this.outlined) {
      classes.push('p-button-outlined');
    }

    return classes.join(' ');
  }

  handleClick(event: Event) {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}
