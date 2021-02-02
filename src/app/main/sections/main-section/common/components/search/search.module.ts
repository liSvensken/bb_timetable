import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { MainButtonModule } from '@common/components/main-button/main-button.module';
import { SelectModule } from '@common/components/controls/select/select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { InputModule } from '@common/components/controls/input/input.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    SearchComponent,
    FilterComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainButtonModule,
    SelectModule,
    ReactiveFormsModule,
    InputModule,
    InfiniteScrollModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {
}
