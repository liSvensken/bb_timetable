import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
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
  @Input() linkBtn: string;
  @Input() btnContent: string;
  @Input() pageName: string;
  @Input() modelRequest: UsersSearchRequest;
  componentDestroyed$ = new Subject();

  currentUser$ = new BehaviorSubject<UserModel>(null);
  isMaster$ = new BehaviorSubject<boolean>(null);

  subscribersList$ = new BehaviorSubject<UserModel[]>(null);
  lastPage = false;
  search$ = new Subject();
  isLoading$ = new BehaviorSubject(false);
  isErrors$ = new BehaviorSubject(false);

  formFilter = this.db.group({
    query: [null],
    service: [null],
    city: [null],
  });

  constructor(private activatedRoute: ActivatedRoute,
              private db: FormBuilder,
              private usersApiService: UsersApiService,
              private sessionService: SessionService) {

    this.currentUser$ = this.sessionService.user$;
    this.isMaster$.next(this.currentUser$.value.role === RoleEnum.MASTER);
  }

  ngOnInit(): void {
    const pageData: UsersSearchResponse = this.activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this.parseData(pageData);
      this.initSearch();

      Object.keys(this.formFilter.controls).forEach(key => {
        const control = this.formFilter.controls[key];
        control.valueChanges
          .pipe(
            takeUntil(this.componentDestroyed$),
            distinctUntilChanged()
          )
          .subscribe(() => this.search());
      });
    } else {
      this.isErrors$.next(true);
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  initSearch(): void {
    this.search$
      .pipe(
        debounceTime(300),
        takeUntil(this.componentDestroyed$),
        tap(() => this.setLoading(true)),
        switchMap(() => {
          const model = {
            ...this.modelRequest,
            ...this.formFilter.value
          };
          return this.usersApiService.searchUsers(cleanObject(model))
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
    if (this.subscribersList$.value.length >= data.totalItems) {
      this.lastPage = true;
    }
  }

  onScroll(): void {
    this.nextPage();
  }

  setSubscriberList(subscriber: UserModel[]): void {
    this.subscribersList$.next(subscriber ? subscriber : []);
  }

  nextPage(): void {
    if (!this.lastPage && !this.isLoading$.value) {
      this.search$.next();
    }
  }

  setLoading(flag): void {
    this.isLoading$.next(flag);
  }

  search(newPage?: boolean): void {
    this.search$.next(newPage);
  }
}
