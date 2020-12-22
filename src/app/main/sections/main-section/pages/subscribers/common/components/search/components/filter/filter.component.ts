import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServiceModel } from '@common/interfaces/models/service.model';
import { CityModel } from '@common/interfaces/models/city.model';
import { ServicesApiService } from '@common/services/api/services-api.service';
import { CitiesApiService } from '@common/services/api/cities-api.service';
import { GetServicesRequest } from '@common/interfaces/api/get-services-request.interface';
import { takeUntil } from 'rxjs/operators';
import { GetCitiesRequest } from '@common/interfaces/api/get-cities-request.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() formFilter: FormGroup;

  componentDestroyed$ = new Subject();
  serviceList$ = new BehaviorSubject<ServiceModel[]>(null);
  citiesList$ = new BehaviorSubject<CityModel[]>(null);

  constructor(private servicesApiService: ServicesApiService,
              private citiesApiService: CitiesApiService) {

    const modelServices: GetServicesRequest = {
      limit: 10,
      offset: 0
    };
    this.servicesApiService.getServices(modelServices)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        this.serviceList$.next(data.result);
      });

    const modelCities: GetCitiesRequest = {
      limit: 10,
      offset: 0
    };
    this.citiesApiService.getCities(modelCities)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        this.citiesList$.next(data.result);
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
