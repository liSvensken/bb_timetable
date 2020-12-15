import { AfterViewInit, Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  value = null;
  disabled = false;
  placeholderTop$ = new BehaviorSubject(false);
  ngControl: NgControl;
  control: FormControl | AbstractControl;

  @Input() type: string;
  @Input() placeholder: string;
  @Input() example = '';

  private onChange = (value: any) => {
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
    this.value = outsideValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(insideValue: number): void {
    this.value = insideValue;
    this.onChange(insideValue);
  }

  focus(): void {
    this.placeholderTop$.next(true);
  }

  blur(): void {
    this.onTouched();
    this.placeholderTop$.next(false);
  }
}
