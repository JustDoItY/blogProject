import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { BaseComponent, htmlEscape } from '@/helpers';
import { DynamicApi, LoginRegisterApi } from '@/services';

@Component({
  selector: 'page-dynamic-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PageDynamicComponent extends BaseComponent implements OnInit {
  inputValue = '';
  maxLength = 100;
  dynamics: Array<{_id, title, content, writeDate, good, userID}> = [];
  loginStatus = false;

  constructor(
    private msg: NzMessageService) {
    super();
  }

  async ngOnInit() {
    // 查询是否登录状态
    DynamicApi.getDynamics().then(res => this.dynamics = res.data.content);
    const { data } = await LoginRegisterApi.getSession();
    if (data.retCode === 'success') this.loginStatus = true;
  }

  async submit() {
    if (!this.inputValue.trim()) return this.msg.warning('请不要发布空信息');
    const { data } = await DynamicApi.saveDynamic(htmlEscape(this.inputValue));
    this.dynamics = data.content;
    this.inputValue = '';
    this.msg.success(data.retMsg);
  }
}
