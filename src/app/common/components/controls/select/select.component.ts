import { Component, forwardRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    name: 'Другое'
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
export class SelectComponent implements OnInit, ControlValueAccessor {
  value = null;
  disabled = false;

  servicesList$ = new BehaviorSubject(null);

  private onChange = (value: any) => {
  }
  private onTouched = () => {
  }

  constructor() {
  }

  ngOnInit(): void {
    this.servicesList$.next(SERVICES);
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
}
