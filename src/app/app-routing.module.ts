import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthWindowComponent } from './auth-window/auth-window.component';

import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard.service';
import { LoginGuard } from './guards/login.guard';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthWindowComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'profile',
    redirectTo: 'feed',
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    component: CreatePostPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
