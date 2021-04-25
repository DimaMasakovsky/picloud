import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthWindowComponent } from './auth-window/auth-window.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { FeedPostComponent } from './feed-post/feed-post.component';
import { PostHeaderComponent } from './post-header/post-header.component';
import { NewPostFormComponent } from './new-post-form/new-post-form.component';
import { DoubleContentDirective } from './double-content.directive';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';
import { PostModalComponent } from './post-modal/post-modal.component';
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
    DoubleContentDirective,
    ProfileHeaderComponent,
    ProfilePostComponent,
    PostModalComponent,
  ],
  entryComponents: [PostModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
    }),
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
