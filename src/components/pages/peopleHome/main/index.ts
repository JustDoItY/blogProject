import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { ArticleApi } from '@/services';
import { AttentionApi, UserApi } from '@/services';

@Component({
  selector: 'page-people-home-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PagePeopleHomeComponent {
  index = 0;
  loginStatus = false;
  userInfo = {
    _id: '',
    avatar: '',
    userName: '',
  };
  id = this.activeRouter.snapshot.paramMap.get('id');

  follower = [];

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private activeRouter: ActivatedRoute) {
    this.getUserInfo();
    // 监听navigationend事件，触发更新, 解决路由参数改变，页面不刷新问题
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.id = this.activeRouter.snapshot.paramMap.get('id');
        this.getUserInfo();
      }
    });
  }

  // 获取用户信息
  async getUserInfo() {
    const { data } = await UserApi.getUserInfo(this.id);
    if (data.userInfo) { // 如果返回用户或作者信息，就设置信息
      this.userInfo = data.userInfo;
      this.getAttention(data.userInfo._id);
    } else { // 信息为空，跳转到首页
      this.router.navigate(['/home']);
      this.msg.error('未知错误');
      return;
    }
    this.loginStatus = data.loginStatus;
  }

  getAttention(id) { // 获取关注人数
    AttentionApi.getAttention(id).then(({data}) => {
      this.follower = data.content;
    });
  }
}
