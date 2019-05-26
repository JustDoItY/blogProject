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
    this.articles = data.articles; // 从后台获取的文章
    this.edit = data.edit; // 如果处于登录状态，设置为true， 默认为false
  }

  async deleteArticle(id, i) {
    const {data} = await ArticleApi.deleteArticle(id);
    if (data.retCode === 'success') {
      this.articles.splice(i, 1);
      this.msg.success(data.retMsg);
    } else {
      this.msg.error(data.retMsg); // 删除文章出错，提示信息
      this.edit = false; // 设置为不可编辑状态
    }
  }
}
