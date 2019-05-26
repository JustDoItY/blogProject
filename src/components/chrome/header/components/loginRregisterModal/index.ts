import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import { emailVerify } from '@/helpers';
import { LoginRegisterApi } from '@/services';

@Component({
  selector: 'login-register-modal-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class LoginRegisterModalComponent {
  @Input() loginStatus = true; // 登陆或注册状态，默认处于登陆状态
  @Input() title = '登陆';
  checkPaw = ''; // 再次输入密码

  private userInfo = {
    userName: null,
    paw: null,
    email: null,
  };

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    private router: Router) {}

  submit() {
    // 登录状态下检测登录类型，邮箱或用户名
    const loginType = this.loginStatus && emailVerify(this.userInfo.userName) ? 'email' : 'username';
    // 注册用户状态下检测邮箱pattern正确
    if (!this.loginStatus) { // 注册状态下检测
      if (this.userInfo.paw !== this.checkPaw) return this.msg.error('两次密码输入不一致');
      if (!emailVerify(this.userInfo.email)) return this.msg.error('请输入正确的邮箱');
    }

    LoginRegisterApi.loginRegister(this.userInfo, this.loginStatus, loginType).then(res => {
      if (res.data.retCode === 'success') {
        if (this.loginStatus) { // 登录
          this.modal.close(res.data.content);
          this.router.navigate(['/home']); // 登陆后跳转到主页
        } else {
          this.modal.close(); // 注册
          this.msg.success(res.data.retMsg);
        }
      } else {
        this.msg.error(res.data.retMsg);
      }
    });
  }
}
