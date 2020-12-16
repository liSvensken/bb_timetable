import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UsersApiService } from '@common/services/api/users-api.service';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { UserModel } from '@common/interfaces/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { LIMIT_PAGE } from './search.utils';
import { UserSearchResponse } from '@common/interfaces/api/user-search-response.interface';
import { SessionService } from '@common/services/session.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  componentDestroyed$ = new Subject();
  search$ = new Subject();
  lastPage = false;
  isLoading$ = new BehaviorSubject(false);
  isErrors$ = new BehaviorSubject(false);

  formFilter = this.db.group({
    service: [null],
    city: [null],
  });

  searchControl = this.db.control('');

  masters$ = new BehaviorSubject<UserModel[]>(null);

  constructor(private activatedRoute: ActivatedRoute,
              private db: FormBuilder,
              private usersApiService: UsersApiService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    const pageData: UserSearchResponse = this.activatedRoute.snapshot.data.pageData;
    if (pageData) {
      this.parseData(pageData);
      this.initSearch();
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
        takeUntil(this.componentDestroyed$),
        tap(() => this.setLoading(true)),
        switchMap(() => {
          const model: UsersSearchRequest = {
            limit: LIMIT_PAGE,
            offset: this.masters$.value.length
          };
          return this.usersApiService.searchMasters(model)
            .pipe(finalize(() => this.setLoading(false)));
        })
      )
      .subscribe(
        (data: UserSearchResponse) => {
          this.parseData(data);
        },
        () => this.isErrors$.next(true));
  }

  parseData(data: UserSearchResponse): void {
    this.setUsersList(data.result);
    if (this.masters$.value.length >= data.totalItems) {
      this.lastPage = true;
    }
  }

  onScroll(): void {
    this.nextPage();
  }

  setUsersList(users: UserModel[]): void {
    this.masters$.next(this.masters$.value ? [...this.masters$.value, ...users] : users);
  }

  nextPage(): void {
    if (!this.lastPage && !this.isLoading$.value) {
      this.search$.next();
    }
  }

  setLoading(flag): void {
    this.isLoading$.next(flag);
  }
}
