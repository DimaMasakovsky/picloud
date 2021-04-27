import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStatsComponent } from './post-stats.component';

describe('PostStatsComponent', () => {
  let component: PostStatsComponent;
  let fixture: ComponentFixture<PostStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostStatsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
