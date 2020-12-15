import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { MainButtonModule } from '@common/components/main-button/main-button.module';
import { SelectModule } from '@common/components/controls/select/select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { InputModule } from '@common/components/controls/input/input.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchResolve } from './search.resolve';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    resolve: {pageData: SearchResolve}
  }
];

@NgModule({
  declarations: [
    SearchComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainButtonModule,
    SelectModule,
    ReactiveFormsModule,
    InputModule,
    InfiniteScrollModule
  ],
  providers: [
    SearchResolve
  ]
})
export class SearchModule {
}
