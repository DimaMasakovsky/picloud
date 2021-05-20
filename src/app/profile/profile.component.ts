import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userID: string;

  public user: User;

  public currentUser: User;

  private subscriptions: Array<Subscription> = [];

  public postsSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.subscriptions.push(
      this.crudService.getCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
      this.route.params
        .pipe(
          switchMap((routeParams) => {
            return this.crudService.handleObjectByRef('users', routeParams.id);
          }),
        )
        .subscribe((user) => {
          this.user = user;
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  signOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['']));
  }

  public canView(): boolean {
    // eslint-disable-next-line no-nested-ternary
    return this.user.uid === this.currentUser.uid
      ? true
      : this.user.isPrivate
      ? this.user.followers.includes(this.currentUser.uid)
      : true;
  }
}
