import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioComponent)
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor{
  @Input() value: string;
  @Input() name: string;
  @Input() content: string;

  valueControl = null;
  disabled = false;

  private onChange = (value) => {
  }
  private onTouched = () => {
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: number): void {
    this.valueControl = outsideValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(insideValue: number): void {
    this.valueControl = insideValue;
    this.onChange(insideValue);
    this.onTouched();
  }
}
