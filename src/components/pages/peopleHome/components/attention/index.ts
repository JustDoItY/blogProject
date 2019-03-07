import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from '@/helpers';
import { AttentionApi } from '@/services';

@Component({
  selector: 'attention-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class AttentionComponent extends BaseComponent implements OnInit {
  @Input() userId: string;

  followerPeople = [];

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    this.getAttention();
  }

  async getAttention() {
    const { data } = await AttentionApi.getAttention(this.userId);
    this.followerPeople = data.content;
    console.log(this.followerPeople);
  }
}
