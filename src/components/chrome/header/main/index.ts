import { Component, Injectable, OnDestroy , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { LoginRegisterApi } from '@/services';
import { LoginRegisterModalComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-header-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy  {
  loginStatus = false;
  userInfo = null;
  timerID;

  constructor(
    private $modal: NzModalService,
    private router: Router,
    private msg: NzMessageService) {
    this.getSession();
  }

  ngOnInit() {
    this.timerID = setInterval(() => {
      this.getSession();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.timerID);
  }

  async getSession() {
    const { data } = await LoginRegisterApi.getSession();
    if (data.retCode === 'success') {
      this.setLoginInformation(true, data.content);
    } else {
      this.setLoginInformation(false);
      clearInterval(this.timerID);
    }
  }

  loginRegisterModal(title: string, loginStatus: boolean) {
    this.$modal.create({
      nzContent: LoginRegisterModalComponent,
      nzComponentParams: {
        title,
        loginStatus,
      },
      nzFooter: null,
    }).afterClose.subscribe((userInfo) => {
      if (userInfo) {
        this.setLoginInformation(loginStatus, userInfo);

        this.timerID = setInterval(() => {
          this.getSession();
        }, 3000);
      }
    });
  }

  async outLogin() {
    const { data } = await LoginRegisterApi.deleteSession();
    if (data.retCode === 'success') {
      this.setLoginInformation(false);
      clearInterval(this.timerID);
      this.router.navigate(['/home']); // 退出登录 返回首页
    } else {
      this.msg.error('退出登录失败，请重新登录');
    }
  }

  setLoginInformation(loginStatus: boolean, userInfo = null) {
    this.loginStatus = loginStatus;
    this.userInfo = userInfo;
  }
}
