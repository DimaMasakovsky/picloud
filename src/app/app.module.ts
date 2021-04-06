import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    NewPostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
