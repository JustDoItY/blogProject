import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { BaseComponent } from '@/helpers';
import { AttentionApi } from '@/services/attention';

@Component({
  selector: 'attention-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class AttentionComponent extends BaseComponent {
  @Input() follower = []; // 关注者
  @Input() edit = false;

  constructor(private msg: NzMessageService) {
    super();
  }

  deleteFollower(id, i) {
    AttentionApi.deleteFollower(id).then(({data}) => {
      if (data.retCode === 'success') {
        this.follower.splice(i, 1);
        this.msg.success(data.retMsg);
      } else {
        this.msg.success(data.retMsg);
      }
    }, () => {
      this.msg.success('取消关注失败');
    });
  }
}
