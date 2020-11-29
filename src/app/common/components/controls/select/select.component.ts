import { AfterViewInit, Component, forwardRef, HostListener, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

const SERVICES = [
  {
    id: 1,
    name: 'Парикмахерские услуги'
  },
  {
    id: 2,
    name: 'Услуги визажиста'
  },
  {
    id: 3,
    name: 'Массаж'
  },
  {
    id: 4,
    name: 'Тату'
  },
  {
    id: 5,
    name: 'Сантехника'
  }
];

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
export class SelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  value = null;
  disabled = false;
  servicesList$ = new BehaviorSubject(null);

  @ViewChild('ngSelectComponent', { static: false }) ngSelectComponent: NgSelectComponent;

  @Input() placeholder: string;
  @Input() notFoundText: string;

  ngControl: NgControl;
  control: FormControl | AbstractControl;

  private onChange = (value: any) => {
  };
  private onTouched = () => {
  };

  constructor(private inj: Injector) {
  }

  @HostListener('window:resize') resize(): void {
    if (this.ngSelectComponent.isOpen) {
      this.ngSelectComponent.close();
    }
  }

  ngOnInit(): void {
    this.servicesList$.next(SERVICES);
  }

  ngAfterViewInit(): void {
    this.ngControl = this.inj.get(NgControl);
    setTimeout(() => {
      this.control = this.ngControl.control;
    });
    setTimeout(() => {
      console.log(this.control.invalid);
    }, 3000);
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
