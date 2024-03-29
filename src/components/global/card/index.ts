import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { BackInfoModel, BaseComponent } from '@/helpers';
import { ArticlePointGoodApi, DynamicPointGoodApi } from '@/services';

@Component({
  selector: 'card-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class CardComponent extends BaseComponent {
  @Input() id: string; // 文章ID
  @Input() collectionID: string; // 收藏ID
  @Input() user: { _id, userName }; // 作者信息
  @Input() title: string;
  @Input() content: string;
  @Input() writeDate: Date;
  @Input() good: number; // 点赞数量
  @Input() edit = false;
  @Input() type: string; // 文章类型

  @Output() delete = new EventEmitter<string>();

  constructor(
    private router: Router,
    private msg: NzMessageService) {
    super();
  }

  editArticle() {
    // id: 文章id，文章id作为参数，导航到编辑页面
    this.router.navigate(['./edit', {id: this.id}]);
  }

  deleteArticle() {
    // 只有收藏中才有collectionID
    this.delete.emit(this.collectionID || this.id);
  }

  callback(data: BackInfoModel) {
    if (data.retCode === 'success') {
      this.good = data.content;
    } else {
      this.msg.warning(data.retMsg);
    }
  }

  async pointGood() {
    if (this.type === 'article') {
      const { data } = await ArticlePointGoodApi.pointGood(this.id, this.user._id);
      this.callback(data);
    } else {
      const { data } = await DynamicPointGoodApi.pointGood(this.id, this.user._id);
      this.callback(data);
    }
  }
}
