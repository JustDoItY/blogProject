import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { BaseComponent } from '@/helpers';
import { ArticleApi } from '@/services';

@Component({
  selector: 'articles-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class ArticlesComponent extends BaseComponent implements OnInit {
  @Input() userId = '';
  edit = false;

  articles: Array<{_id, title, content, writeDate, good, userID}> = [];

  constructor(
    private msg: NzMessageService) {
    super();
  }

  async ngOnInit() {
    const {data} = await ArticleApi.getArticlesByUserId(this.userId);
    this.articles = data.articles;
    this.edit = data.edit;
  }

  async deleteArticle(id) {
    const {data} = await ArticleApi.deleteArticle(id);
    if (data.retCode === 'success') {
      this.articles = data.content;
      this.msg.success(data.retMsg);
    } else {
      this.msg.error(data.retMsg);
      this.edit = false;
    }
  }
}
