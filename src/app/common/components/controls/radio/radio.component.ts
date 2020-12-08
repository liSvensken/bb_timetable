import { AfterViewInit, Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

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
export class RadioComponent implements OnInit, AfterViewInit, ControlValueAccessor{
  @Input() value: string;
  @Input() name: string;
  @Input() content: string;

  valueControl = null;
  disabled = false;

  ngControl: NgControl;
  control: FormControl | AbstractControl;

  private onChange = (value) => {
  }
  private onTouched = () => {
  }

  constructor(private inj: Injector) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ngControl = this.inj.get(NgControl);
    setTimeout(() => {
      this.control = this.ngControl.control;
    });
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
