import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Observable, of } from 'rxjs'; 
@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {  
  @Input()
  public userID: string;

  @Input()
  public createTime: {seconds: string};

  public user: any; 

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getObjectByRef("users", this.userID).subscribe((value) => this.user = value);
    
  }
  public getBackgroundImage(): string {
    // sign ? 
    return `url(${this.user.profilePicURL})`;
  }
  public getDate(): string { 
    const months: string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'] 
    const d = new Date (this.createTime.seconds)
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()} `;
  }

}
