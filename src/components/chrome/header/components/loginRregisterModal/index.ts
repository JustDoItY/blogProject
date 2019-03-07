import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import { BackInfoModel } from '@/helpers';
import { LoginRegisterApi } from '@/services';

@Component({
  selector: 'login-register-modal-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class LoginRegisterModalComponent {
  @Input() loginStatus = true; // 登陆或注册状态，默认登陆状态
  @Input() title = '登陆';

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
    LoginRegisterApi.loginRegister(this.userInfo, this.loginStatus).then(res => {
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
