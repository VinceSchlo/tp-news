import {Component, OnInit} from '@angular/core';
import { NewsService } from '../../services/news.service';

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

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getAllSources().subscribe( sources => {
      this.sources = sources;
    });
  }

  search() {
    this.newsService.getBySource(this.sourceSelected, this.keyword).subscribe( sources => {
      console.log(sources)
      this.showSource = sources;
    });
  }

}
