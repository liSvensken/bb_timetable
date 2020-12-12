import { AfterViewInit, Component, forwardRef, HostListener, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent)
    }
  ]
})
export class SelectComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  componentDestroyed$ = new Subject();
  value = null;
  disabled = false;
  servicesList$ = new BehaviorSubject(null);

  @ViewChild('ngSelectComponent', { static: false }) ngSelectComponent: NgSelectComponent;

  @Input() placeholder: string;
  @Input() notFoundText: string;

  ngControl: NgControl;
  control: FormControl | AbstractControl;

  private onChange = (value: any) => {
  }
  private onTouched = () => {
  }

  constructor(private inj: Injector) {
    //
    // this.registrationApiService.getServicesList()
    //     .pipe(takeUntil(this.componentDestroyed$))
    //     .subscribe(
    //         value => {
    //           console.log(value);
    //           this.servicesList$.next(value.result);
    //         },
    //         error => console.log(error)
    //     );
  }

  @HostListener('window:resize') resize(): void {
    if (this.ngSelectComponent.isOpen) {
      this.ngSelectComponent.close();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ngControl = this.inj.get(NgControl);
    setTimeout(() => {
      this.control = this.ngControl.control;
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
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
    this.onTouched();
  }

  blur(): void {
    this.onTouched();
  }
}
