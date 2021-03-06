import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ConfigurableFormControlComponent} from '../configurable-form-control-component';
import {InputConfig} from '../../config/components';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true
    }
  ]
})
export class InputControlComponent implements ConfigurableFormControlComponent<string>, OnInit {
  @Input() config: InputConfig | null;
  onChange: (value: string) => void;
  onTouched: () => void;
  isDisabled: boolean;
  value: string;

  ngOnInit() {
    this.value = this.config.value;
    this.isDisabled = this.config.disabled;
  }

  change(event: any): void {
    this.writeValue(event.target.value);
    if (this.onChange !== undefined) {
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: string): void {
    this.value = obj;
  }
}
