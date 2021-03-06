import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

import { StorageService } from './services/storage.service';
import { CrudService } from './services/crud.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Picloud';

  private subscriptions: Array<Subscription> = [];

  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    private storage: StorageService,
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
    // STORAGE
    // this.subscriptions.push(
    //   this.crudService.handleData('posts').subscribe((data) => {
    //     this.storage.posts = data;
    //   }),
    // );

    // eslint-disable-next-line no-console
    console.table({
      '23.04': this.ProjectUpdateData(
        'Add console table',
        'https://github.com/DimaMasakovsky/picloud/commit/0a2f9245acc45b834920cb9921f17b115fe02c72',
      ),
      '25.04': this.ProjectUpdateData(
        'Add post like feature',
        'https://github.com/DimaMasakovsky/picloud/commit/0343c75f6d5c66a72fea955bc1472b4d19523bb2',
      ),
      '27.04': this.ProjectUpdateData(
        'Add comments, profile bio, profile pic uploading',
        'https://github.com/DimaMasakovsky/picloud/commit/cd7187d9870451735322c8f2df9b3c6143e8cd83',
      ),
      '27.04-1': this.ProjectUpdateData(
        'Add @angular/pwa',
        'https://github.com/DimaMasakovsky/picloud/commit/1705a6293c07b9f057ff48d7b4055a53efb1b8c8',
      ),
      '01.05': this.ProjectUpdateData(
        'Fix: feed and comment order, comment button',
        'https://github.com/DimaMasakovsky/picloud/commit/fb3e1812b3114f93990f15527f339c9b1953b67b',
      ),
      '05.05': this.ProjectUpdateData(
        'Add: post delete button; fix: profile editing, new post button',
        'https://github.com/DimaMasakovsky/picloud/commit/ccbbdbb8bfe92cd0c2eb86b90c1e3433de75be3b',
      ),
      '08.05': this.ProjectUpdateData(
        'Add: follow/unfollow feature, pwa custom icons',
        'https://github.com/DimaMasakovsky/picloud/commit/bf4d0387077961154609fb8143e29a0ce4c6932c',
      ),
      '14.05': this.ProjectUpdateData(
        'Add: responsive design',
        'https://github.com/DimaMasakovsky/picloud/commit/24bb332023e0fcc2fb652c4d36d47a5a9f9b2bd6',
      ),
      '18.05': this.ProjectUpdateData(
        'Add: search, fix: profile routing bug',
        'https://github.com/DimaMasakovsky/picloud/commit/08c4e9a48d7e2bd984dcb189fd9d4a71de14964b',
      ),
      '20.05': this.ProjectUpdateData(
        'Add: ability to open post with link, private profile, fix: search reset on routing',
        'https://github.com/DimaMasakovsky/picloud/commit/2cf8cb3948349a62d5ad469d72e90fb1eb075a07',
      ),
      '22.05': this.ProjectUpdateData(
        'Add: followers list, validators, post-modal tags, private account private post',
        'https://github.com/DimaMasakovsky/picloud/commit/bbbbdbfe28b635730f82c9a92338bc2019a10840',
      ),
      '23.05': this.ProjectUpdateData(
        'fix: minor improvements and fixes',
        'https://github.com/DimaMasakovsky/picloud/commit/3f6056759638687a9bb52e8e3c64d9a6a5c7138f',
      ),
      '25.05': this.ProjectUpdateData(
        'add: redirect to 404, fix: ui improvements',
        'https://github.com/DimaMasakovsky/picloud/commit/45fe8f33dc0e82363856ecdb6e7935552f624fc1',
      ),
      '25.05-1': this.ProjectUpdateData(
        'fix: search stays even on route changes',
        'https://github.com/DimaMasakovsky/picloud/commit/45fe8f33dc0e82363856ecdb6e7935552f624fc1',
      ),
      '25.05-2': this.ProjectUpdateData(
        'fix: input autofocus',
        'https://github.com/DimaMasakovsky/picloud/commit/0a0e014ee44c16fc054adbdf5967e5e3a7c7dcc9',
      ),
      '02.06': this.ProjectUpdateData(
        'add: filter on file upload',
        'https://github.com/DimaMasakovsky/picloud/commit/00647511fd9abe21cbfe2e429d35c6650fa0e275',
      ),
      '03.06': this.ProjectUpdateData(
        'fix: ui improvements',
        'https://github.com/DimaMasakovsky/picloud/commit/c338ad2213d30d03406aa55f74c7c065542e38fd',
      ),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ProjectUpdateData(description: string, commitLink: string) {
    return { description, commitLink };
  }
}
