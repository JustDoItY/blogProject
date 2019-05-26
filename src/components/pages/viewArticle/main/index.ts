import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { CollectArticleApi, CommentApi, SearchApi } from '@/services';

@Component({
  selector: 'page-view-article-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PageViewArticleComponent implements OnInit {
  article = {
    _id: '',
    title: '',
    content: '',
    writeDate: '',
    good: 0,
    userID: {
      _id: '',
      userName: '',
      avatar: '',
    },
  };
  fromID = ''; // 关注者
  comments = [];
  avatar = ''; // 登录用户的avatar

  constructor(
    private msg: NzMessageService,
    private router: ActivatedRoute) {}

  async ngOnInit() {
    const { data } = await SearchApi.getArticle(this.router.snapshot.paramMap.get('id'));
    this.article = data.article;
    this.fromID = data.loginID;
    this.avatar  = data.avatar;
    // 文章ID返回后，查询评论内容
    CommentApi.getComment(this.article._id).then((res) => this.comments = res.data.content);
  }

  async addCollection() {
    CollectArticleApi.addColletion(this.article._id, this.fromID, this.article.userID._id)
    .then(({data}) => {
      this.msg.info(data.retMsg);
    }, (data) => {
      this.msg.error(data.retMsg);
    });
  }
}
