import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { BackInfoModel } from '@/helpers';
import { AttentionApi, CommentApi, SearchApi } from '@/services';

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
  fromID = '';
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

  saveAttention() {
    AttentionApi.saveAttention({follower: this.fromID, followedPerson: this.article.userID._id})
    .then((res) => {
      if (res.data.retCode === 'success') {
        this.msg.success(res.data.retMsg);
      } else {
        this.msg.warning(res.data.retMsg);
      }
    });
  }
}
