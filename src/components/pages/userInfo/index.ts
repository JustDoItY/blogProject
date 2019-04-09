import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { emailVerify } from '@/helpers';
import { LoginRegisterApi, UserApi } from '@/services';

@Component({
  selector: 'page-userInfo-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PageUserInfoComponent {
  userInfo = {
    avatar: '',
    userName: '',
    email: '',
  };

  @ViewChild('imgInput') imgInput: ElementRef;

  constructor(
    private router: Router,
    private msg: NzMessageService) {
    this.getSession();
  }

  async getSession() {
    const {data} = await LoginRegisterApi.getSession();
    if (data.retCode === 'success') {
      this.userInfo = data.content;
    } else {
      this.userInfo = null;
      this.msg.warning(data.retMsg);
      this.router.navigate(['./home']);
    }
  }

  triggerInputClick() {
    this.imgInput.nativeElement.click();
  }

  changeAvatar() {
    const res = this.checkImg(this.imgInput.nativeElement.files[0]);
    if (!res) return;
    this.getBase64(this.imgInput.nativeElement.files[0], (img: string) => this.userInfo.avatar = img);
  }

  // 上传改变触发
  async submit() {
    if (!emailVerify(this.userInfo.email)) return this.msg.error('请输入正确的邮箱');

    const { data } = await UserApi.setUserInfo(this.userInfo);
    this.msg.info(data.retMsg);
  }

  checkImg(file: File) {
    // 检查图片类型
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      this.msg.error('只支持JPG,PNG格式图片!');
      return false;
    }
    // 检查图片大小
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      this.msg.error('图片必须小于4MB!');
      return false;
    }

    return true;
  }

  // 图片转为base64格式
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result.toString()));
    reader.readAsDataURL(img);
  }
}
