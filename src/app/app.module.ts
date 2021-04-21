import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthWindowComponent } from './auth-window/auth-window.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { FeedPostComponent } from './feed-post/feed-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostHeaderComponent } from './post-header/post-header.component';
import { NewPostFormComponent } from './new-post-form/new-post-form.component';
import { ZoomDirective } from './zoom.directive';
import { DoubleContentDirective } from './double-content.directive';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthWindowComponent,
    HeaderComponent,
    FooterComponent,
    FeedComponent,
    ProfileComponent,
    SearchComponent,
    FeedPostComponent,
    PostHeaderComponent,
    NewPostFormComponent,
    ZoomDirective,
    DoubleContentDirective,
    ProfileHeaderComponent,
    ProfilePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    }),
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
