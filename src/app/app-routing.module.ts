import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthWindowComponent } from './auth-window/auth-window.component';

import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard.service';
import { LoginGuard } from './guards/login.guard';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
