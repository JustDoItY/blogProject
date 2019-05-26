import { Component, Input, OnInit } from '@angular/core';

import { BaseComponent } from '@/helpers';

@Component({
  selector: 'collections-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class CollectionsComponent extends BaseComponent {
  @Input() userId = '';
  @Input() edit = [];
}
