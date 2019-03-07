import { Component, OnInit } from '@angular/core';

import { BaseComponent, htmlEscape } from '@/helpers';
import { SearchApi } from '@/services';

@Component({
  selector: 'page-home-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PageHomeComponent extends BaseComponent implements OnInit {
  searchKey = '';
  articles: Array<{_id, title, content, writeDate, good, userID}> = [];
  timeId;

  ngOnInit() {
    this.getPage();
  }

  async getPage(page = 1) {
    const { data } = await SearchApi.getPage(page);
    this.articles = data.articles;
  }

  change() {
    const field = htmlEscape(this.searchKey.trim());
    clearTimeout(this.timeId);
    if (field === '') return this.getPage();
    // 延迟查询
    this.timeId = setTimeout(async () => {
      const { data } = await SearchApi.searchBy(field);
      this.articles = data.articles;
    }, 500);
  }
}
