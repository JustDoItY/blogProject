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
export class HeaderComponent implements OnInit, OnDestroy {
  loginStatus = false; // 登录状态
  userInfo = null; // 用户信息
  timerID; // 计时器句柄

  constructor(
    private $modal: NzModalService,
    private router: Router,
    private msg: NzMessageService) {
    this.getSession();
  }
  // 组件被创建时运行ngOninit生命周期函数
  ngOnInit() {
    this.timerID = setInterval(() => {
      this.getSession(); // 更新session信息
    }, 3000);
  }
  // 组件被消灭时，即离开当前页面被调用
  ngOnDestroy() {
    clearInterval(this.timerID);
  }
  // 从服务器后台获取session信息
  async getSession() {
    try {
      // 发送请求
      const { data } = await LoginRegisterApi.getSession(); // 采用结构赋值提取结果，如果出错，进入catch
      if (data.retCode === 'success') {
        this.setLoginInformation(true, data.content);
      } else {
        this.setLoginInformation(false);
        clearInterval(this.timerID);
      }
    } catch (error) {
      clearInterval(this.timerID);
    }
  }
  // 登录注册弹出式模态框
  loginRegisterModal(title: string, loginStatus: boolean) {
    this.$modal.create({
      nzContent: LoginRegisterModalComponent,  // 登录注册组件
      nzComponentParams: {
        title,
        loginStatus,
      },
      nzFooter: null,
    }).afterClose.subscribe((userInfo) => { // 返回信息
      if (userInfo) { // 登录成功，用户信息不为空，设置登录用户信息
        this.setLoginInformation(loginStatus, userInfo);

        this.timerID = setInterval(() => {
          this.getSession();
        }, 3000);
      }
    });
  }
  // 退出登录
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
  // 设置用户信息
  setLoginInformation(loginStatus: boolean, userInfo = null) {
    this.loginStatus = loginStatus; // 登录状态
    this.userInfo = userInfo; // 设置用户信息
  }
}
