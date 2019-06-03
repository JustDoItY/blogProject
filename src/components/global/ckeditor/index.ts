import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ckeditor-component',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class CkeditorComponent implements OnInit {
  ckeConfig: any;

  @Input() mycontent: string = '';
  @Input() maxlength = 2000;

  @ViewChild('myckeditor') ckeditor: any;

  @Output() contentChange = new EventEmitter(); // 传递给父组件article内容

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
    };
  }

  onChange(): void {
    this.contentChange.emit(this.mycontent);
  }
}
