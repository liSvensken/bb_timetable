import {
  AfterViewInit,
  Component,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ServiceModel } from '@common/interfaces/models/service.model';
import { CityModel } from '@common/interfaces/models/city.model';

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
export class SelectComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  componentDestroyed$ = new Subject();
  value = null;
  disabled = false;
  itemsList$ = new BehaviorSubject<ServiceModel[] | CityModel[]>([]);

  @ViewChild('ngSelectComponent', { static: false }) ngSelectComponent: NgSelectComponent;

  @Input() placeholder: string;
  @Input() notFoundText: string;
  @Input() itemsList: ServiceModel[] | CityModel[];
  @Input() multipleBoll: boolean;
  @Input() closeOnSelectBoll: boolean;
  @Input() clearableBoll: boolean;

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

  ngOnChanges(): void {
    this.itemsList$.next(this.itemsList);
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
