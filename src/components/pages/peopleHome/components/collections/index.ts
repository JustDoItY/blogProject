import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { BaseComponent } from '@/helpers';
import { CollectArticleApi } from '@/services';

@Component({
  selector: 'collections-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class CollectionsComponent extends BaseComponent implements OnInit {
  @Input() userId = '';
  @Input() edit = false;

  collections = [];

  constructor(private msg: NzMessageService) {
    super();
  }

  async ngOnInit() {
    const {data} = await CollectArticleApi.getCollections(this.userId);
    this.collections = data.content || [];
  }

  async deleteCollection(id, i) {
    const {data} = await CollectArticleApi.deleteCollection(id);
    if (data.retCode === 'success') {
      this.collections.splice(i, 1);
      this.msg.success(data.retMsg);
    } else {
      this.msg.error(data.retMsg); // 删除文章出错，提示信息
      this.edit = false; // 设置为不可编辑状态
    }
  }
}
