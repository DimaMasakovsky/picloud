import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subscription } from 'rxjs';
import { finalize, takeWhile, tap } from 'rxjs/operators';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
  @Input()
  public userID: string;

  public user: User;

  public currentUser: User;

  public isEditing: boolean;

  public imageLink = '';

  public progress = '';

  public updateProfileForm: FormGroup;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private uploadService: UploadService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(
      this.crudService.handleObjectByRef('users', this.userID).subscribe((user: User) => {
        this.user = user;
      }),
      this.crudService.getCurrentUserData().subscribe((value) => {
        this.currentUser = value;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private initForm(): void {
    this.updateProfileForm = this.fb.group({
      bio: ['', [Validators.pattern(/[ -~]/)]],
      file: [''],
      fileUpload: [''],
    });
  }

  public onSubmit(): void {
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
  }
}
