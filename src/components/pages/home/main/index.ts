import { Component, OnInit } from '@angular/core';

import { articleTypesArr, BaseComponent, htmlEscape } from '@/helpers';
import { SearchApi } from '@/services';

@Component({
  selector: 'page-home-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PageHomeComponent extends BaseComponent implements OnInit {
  searchKey = '';
  articles: Array<{_id, title, content, writeDate, good, userID}> = [];
  subject = 'all'; // 文章主题
  total = 0;
  field = '';
  timeId;
  articleTypesArr = articleTypesArr;

  ngOnInit() {
    this.getPage();
  }

  async getPage(page = 1, field = '', subject = 'all') {
    const { data } = await SearchApi.getPage(page, field, subject);
    this.articles = data.articles;
    this.total = data.total;
  }

  // 改变搜索字段，从后台查询数据
  fieldChange() {
    this.field = htmlEscape(this.searchKey.trim());
    // 在5毫秒内只查询一次，输入过快出发函数，取消前一次timeout
    clearTimeout(this.timeId);
    this.timeId = setTimeout(async () => {
      this.getPage(1, this.field, this.subject);
    }, 500);
  }

  pageIndexChange(index) {
    this.getPage(index, this.field, this.subject);
  }

  modifyArticleSubject(subject) {
    this.subject = subject;
    this.getPage(1, this.field, subject);
  }
}
