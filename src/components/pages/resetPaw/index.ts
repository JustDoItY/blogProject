import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import axios from 'axios';

import { emailVerify } from '@/helpers';
import { ResetPawApi } from '@/services';

@Component({
  selector: 'page-reset-paw-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PageResetPawComponent {
  current = 0;
  emailAddress = ''; // 邮箱地址
  confirmAddress = ''; // 核查邮箱地址
  userExist = false; // 判断用户是否存在
  paw = '';
  confirmPaw = '';
  emailCode = ''; // 输入的验证码
  verifyCode = ''; // 服务器返回的验证码

  timer; // 计时器手柄
  interval = 60; // 60秒计时
  isSend = false; // 判定是否发送验证码, 发送之后用于禁用发送验证码按钮

  constructor(
    private msg: NzMessageService,
    private router: Router) {}

  // 发送邮箱验证码
  sendEmail() {
    if (!emailVerify(this.emailAddress)) return this.msg.error('请输入正确的邮箱');

    this.confirmAddress = this.emailAddress; // 记录邮箱地址
    axios.post('/api/emailcode', {eml: this.confirmAddress}).then(({data}) => {
      this.msg.info(data.retMsg);
      this.verifyCode = data.content;
      if (data.retCode === 'success') {
        this.userExist = true;
        // 发送成功，开始计时
        this.isSend = true;
        // 60秒倒计时
        this.timer = setInterval(() => {
          --this.interval;
          if (this.interval === 0) {
            clearInterval(this.timer);
            this.verifyCode = '';
            this.isSend = false;
          }
        }, 1000);
      } else {
        this.userExist = false;
      }
    });
  }

  // 第一步邮箱验证码验证成功，进入第二步
  verifyEmailCode() {
    if (!this.userExist) return this.msg.error('邮箱用户不存在吗，请重新输入邮箱');

    // 服务器返回得到验证码为空，代表验证码失效
    if (!this.verifyCode) return this.msg.error('重新请求验证码');

    // 交叉验证，保证输入的验证码和从服务器返回的相同
    if (this.confirmAddress.concat(this.emailCode) !== this.emailAddress.concat(this.verifyCode)) {
      this.verifyCode = '';
      return this.msg.error('验证码失效');
    }

    if (this.verifyCode === this.emailCode) {
      this.current++;
    }
  }

  // 第二步提交
  submit() {
    if (this.paw === this.confirmPaw) {
      ResetPawApi.resetPaw(this.emailAddress, this.confirmPaw).then(({data}) => {
        console.log(data);
        this.msg.success(data.retMsg);
        // 修改成功，跳转回首页
        if (data.retCode === 'success') this.router.navigate(['/home']);
      });
    } else {
      this.msg.error('两次密码不一致，重新输入');
    }
  }
}
