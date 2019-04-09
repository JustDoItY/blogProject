import { Component, Input, OnInit } from '@angular/core';

import { BaseComponent } from '@/helpers';

@Component({
  selector: 'attention-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class AttentionComponent extends BaseComponent {
  @Input() follower = []; // 关注者
}
