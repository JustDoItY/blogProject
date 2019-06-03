import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { BackInfoModel, htmlEscape } from '@/helpers';
import { ArticleApi, LoginRegisterApi, SearchApi } from '@/services';

interface  Article {
  title: string;
  content: string;
}

@Component({
  selector: 'page-edit-article-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PageEditArticleComponent implements OnInit {
  articleContent = '';
  title = '';
  articleId: '';
  maxlength = 20000;

  constructor(
    private msg: NzMessageService,
    private activedRouter: ActivatedRoute,
    private router: Router) {}

    async ngOnInit() {
      // 获取路由请求参数，如果处于首次编写，id不存在，id用来区分编辑或发布
      this.articleId = this.activedRouter.snapshot.params.id;
      // 查询是否登录状态，如果非登录状态，
      const {data} = await LoginRegisterApi.getSession();

      if (data.retCode === 'faild') {
        this.msg.warning('未登录，请重新登录');
        this.router.navigate(['/home']);
      } else {
        if (this.articleId) {
          const { data: art } = await SearchApi.getArticle(this.articleId);
          // 用获取到的标题，文章内容填充编辑器。默认情况下为发布状态，标题内容为空
          this.title = art.content.title;
          this.articleContent = art.content.content;
        }
      }
    }

  getArticle(value: string) {
    this.articleContent = value.trim();
  }

  async save() {
    if (!this.title.trim() || !this.articleContent) return this.msg.warning('标题或内容不能为空');
    const {data} = await ArticleApi.saveArticle({
      title: htmlEscape(this.title.trim()),
      articleContent: this.articleContent,
      articleId: this.articleId});

    if (data.retCode === 'success') {
      this.msg.success('保存成功');
    } else {
      this.msg.warning('请重新登录');
    }
    this.router.navigate(['/home']);
  }
}
