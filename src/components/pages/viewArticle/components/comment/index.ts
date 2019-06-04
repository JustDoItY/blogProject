import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { BackInfoModel, BaseComponent, htmlEscape } from '@/helpers';
import { CommentApi } from '@/services';

@Component({
  selector: 'comment-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class CommentComponent extends BaseComponent {
  @Input() articleID: string; // 文章ID
  @Input() avatar: string; // 头像
  @Input() fromID: string; // 评论用户ID
  @Input() toID: string; // 被评论用户ID
  @Input() comments = [];

  commentType = 'comment';
  content = '';

  constructor(
    private msg: NzMessageService) {
    super();
  }

  async submit() {
    if (!this.fromID) return this.msg.warning('请登录后评论');
    if (!this.content.trim()) return this.msg.warning('评论不能为空');

    const { data } = await CommentApi.saveComment({
      fromID: this.fromID,
      toID: this.toID,
      content: htmlEscape(this.content.trim()),
      articleID: this.articleID,
      commentType: this.commentType,
    });
    if (data.retCode === 'success') {
      this.comments = data.content;
      this.content = '';
      debugger;
    } else {
      this.msg.warning(data.retMsg);
    }
  }
}
