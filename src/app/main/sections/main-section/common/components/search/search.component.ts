import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UsersApiService } from '@common/services/api/users-api.service';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { UserModel } from '@common/interfaces/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UsersSearchResponse } from '@common/interfaces/api/user-search-response.interface';
import { SessionService } from '@common/services/session.service';
import { cleanObject } from '@common/utils/common.utils';
import { RoleEnum } from '@common/enums/role.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly _componentDestroyed$ = new Subject();
  private readonly _subscribersList$ = new BehaviorSubject<UserModel[]>(null);
  private readonly _search$ = new Subject();
  private _lastPage = false;

  @Input() readonly linkBtn: string;
  @Input() readonly btnContent: string;
  @Input() readonly pageName: string;

  @Input() readonly modelRequest: UsersSearchRequest;

  // будет использоваться
  readonly isMaster$ = this._sessionService.isMaster$;

  readonly subscribersList$ = this._subscribersList$.asObservable();

  readonly isLoading$ = new BehaviorSubject(false);
  readonly isErrors$ = new BehaviorSubject(false);

  readonly formFilter = this._db.group({
    query: [null],
    service: [null],
    city: [null],
  });

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _db: FormBuilder,
              private readonly _usersApiService: UsersApiService,
              private readonly _sessionService: SessionService) {
  }

  ngOnInit(): void {
    const pageData: UsersSearchResponse = this._activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this.parseData(pageData);
      this.initSearch();

      this.formFilter.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(), // todo попросить у Данила глубокое сравнение объектов
          takeUntil(this._componentDestroyed$),
        )
        .subscribe(() => this.search());
    } else {
      this.isErrors$.next(true);
    }
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  initSearch(): void {
    this._search$
      .pipe(
        takeUntil(this._componentDestroyed$),
        tap(() => this.setLoading(true)),
        switchMap(() => {
          const model = {
            ...this.modelRequest,
            ...this.formFilter.value
          };
          return this._usersApiService.searchUsers(cleanObject(model))
            .pipe(finalize(() => this.setLoading(false)));
        })
      )
      .subscribe(
        (data: UsersSearchResponse) => {
          this.parseData(data);
        },
        () => this.isErrors$.next(true));
  }

  parseData(data: UsersSearchResponse): void {
    this.setSubscriberList(data.result);
    if (this._subscribersList$.value.length >= data.totalItems) {
      this._lastPage = true;
    }
  }

  onScroll(): void {
    this.nextPage();
  }

  setSubscriberList(subscriber: UserModel[]): void {
    this._subscribersList$.next(subscriber ? subscriber : []);
  }

  nextPage(): void {
    if (!this._lastPage && !this.isLoading$.value) {
      this._search$.next();
    }
  }

  setLoading(flag): void {
    this.isLoading$.next(flag);
  }

  search(newPage?: boolean): void {
    this._search$.next(newPage);
  }
}
