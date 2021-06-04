import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subscription } from 'rxjs';
import { finalize, takeWhile, tap } from 'rxjs/operators';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';
import { UploadService } from '../services/upload.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public userID: string;

  public user: User;

  public currentUser: User;

  public isEditing: boolean;

  public imageLink = '';

  public progress = '';

  public updateProfileForm: FormGroup;

  private subscriptions: Array<Subscription> = [];

  private dialogWidth: '40vw' | '90vw';

  private dialogRef: MatDialogRef<UserListComponent>;

  constructor(
    private uploadService: UploadService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private crudService: CrudService,
    private dialog: MatDialog,
    public media: MediaObserver,
    private router: Router,
  ) {}

  ngOnChanges(): void {
    this.subscriptions.push(
      this.crudService.handleObjectByRef('users', this.userID).subscribe((user: User) => {
        this.user = user;
      }),
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(
      this.crudService.handleCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
      this.media.asObservable().subscribe(() => {
        if (this.dialogRef && this.dialogWidth === '40vw' && this.media.isActive('lt-md')) {
          this.dialogRef.close();
        }
        if (this.dialogRef && this.dialogWidth === '90vw' && this.media.isActive('gt-sm')) {
          this.dialogRef.close();
        }
        this.dialogWidth = this.media.isActive('lt-md') ? '90vw' : '40vw';
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public viewControl(): boolean {
    return !this.router.url.includes('/feed') && this.currentUser.uid === this.user.uid;
  }

  private initForm(): void {
    this.updateProfileForm = this.fb.group({
      bio: ['', [Validators.maxLength(128)]],
      file: [''],
      fileUpload: [''],
    });
  }

  public get bio() {
    return this.updateProfileForm.get('bio');
  }

  public onFormSubmit(): void {
    const { controls } = this.updateProfileForm;
    if (this.updateProfileForm.valid && this.imageLink !== null) {
      let data: {} = {};
      if (controls.bio.touched && controls.bio.valid) data = { bio: controls.bio.value };
      if (controls.fileUpload.valid && this.imageLink !== '' && this.imageLink !== null) {
        data = { photoURL: this.imageLink };
      }
      this.subscriptions.push(
        this.crudService
          .updateObject('users', this.user.uid, data)
          .pipe(
            tap(() => {
              this.toast.success('Profile updated');
            }),
            finalize(() => {
              this.updateProfileForm.reset();
              this.imageLink = '';
              this.progress = '';
            }),
          )
          .subscribe(),
      );
    }
  }

  public onFileSelected(event): void {
    const file = event.target.files[0];
    const types = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'];

    if (types.includes(file.type) && file.size < 11000000) {
      this.subscriptions.push(
        combineLatest(this.uploadService.uploadFile('profilePictures', file))
          .pipe(
            tap(([percent, link]) => {
              this.progress = percent.toString();
              this.imageLink = link;
              if (link) this.updateProfileForm.controls.fileUpload.setValue(true);
            }),
            takeWhile(([percent, link]) => !link),
          )
          .subscribe(),
      );
    } else if (file.size > 11000000) {
      this.toast.error('Pics should weight less than 10MB');
    } else {
      this.toast.error('Only .png, .jpg or .webp images are accepted!');
    }
  }

  public togglePrivate(): void {
    this.crudService.updateObject('users', this.currentUser.uid, {
      isPrivate: !this.currentUser.isPrivate,
    });
  }

  public openUserList(category: 'followers' | 'following') {
    if (
      (this.user.followersCount !== 0 && category === 'followers') ||
      (this.user.followingCount !== 0 && category === 'following')
    ) {
      this.dialogRef = this.dialog.open(UserListComponent, {
        data: {
          category,
          userID: this.user.uid,
        },
        width: this.dialogWidth,
      });
    }
  }
}
