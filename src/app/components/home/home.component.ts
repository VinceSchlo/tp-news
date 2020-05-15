import {Component, OnInit} from '@angular/core';
import { NewsService } from '../../services/news.service';
import { UserService } from '../../services/user.service';
import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sources: any;
  public sourceSelected: string;
  public showSource: any;
  public keyword: string;
  public currentUser: any;
  private bookmarkToAdd: object;
  token: string;

  constructor(
    private newsService: NewsService,
    private userService: UserService,
    private bookmarkService: BookmarkService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');

    this.newsService.getAllSources().subscribe( sources => {
      this.sources = sources;
    });

    this.userService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
      console.log(currentUser);
    });
  }

  search(id = null) {
    if (id) {
      this.sourceSelected = id;
    }
    this.newsService.getBySource(this.sourceSelected, this.keyword).subscribe( sources => {
      console.log(sources);
      this.showSource = sources;
    });
  }

  logout() {
    this.userService.logout();
  }

  addBookmark() {
    this.bookmarkToAdd = this.sources.sources.find(source => source.id ===  this.sourceSelected);
    this.bookmarkToAdd = {...this.bookmarkToAdd, token: localStorage.getItem('token')};
    this.bookmarkService.addBookmark(this.bookmarkToAdd).subscribe( bookmark => {
      this.userService.getUser(this.token);
    });
  }

  removeBookmark(id) {
    this.bookmarkService.removeBookmark(id).subscribe( res => {
      this.userService.getUser(this.token);
    });
  }

}
