import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PageAboutComponent,
  PageDynamicComponent,
  PageEditArticleComponent,
  PageHomeComponent,
  PagePeopleHomeComponent,
  PageResourcesComponent,
  PageUserInfoComponent,
  PageViewArticleComponent,
} from '@/components';

const routes: Routes = [
  { path: 'home', component: PageHomeComponent },
  { path: 'edit', component: PageEditArticleComponent },
  { path: 'view/:id', component: PageViewArticleComponent },
  { path: 'about', component: PageAboutComponent },
  { path: 'resources', component: PageResourcesComponent },
  { path: 'dynamic', component: PageDynamicComponent },
  { path: 'peopleHome/:id', component: PagePeopleHomeComponent },
  { path: 'userInfo', component: PageUserInfoComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
