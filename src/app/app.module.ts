import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { PostStatsComponent } from './post-stats/post-stats.component';
import { CommentComponent } from './comment/comment.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { UrlParentesisPipe } from './pipes/url-parentesis.pipe';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { RecommendedUsersComponent } from './recommended-users/recommended-users.component';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './user-list/user-list.component';
import { TagComponent } from './tag/tag.component';
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
    ProfileHeaderComponent,
    ProfilePostComponent,
    PostModalComponent,
    PostStatsComponent,
    CommentComponent,
    CustomDatePipe,
    UrlParentesisPipe,
    FollowButtonComponent,
    RecommendedUsersComponent,
    CreatePostPageComponent,
    SearchPageComponent,
    AboutComponent,
    NotFoundComponent,
    UserListComponent,
    TagComponent,
  ],
  entryComponents: [PostModalComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    OverlayModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
    }),
    BrowserAnimationsModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
