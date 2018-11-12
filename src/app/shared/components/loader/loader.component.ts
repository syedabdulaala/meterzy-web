import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  host: { 'style': 'width: 100%;' }
})
export class LoaderComponent implements OnInit {

  visibility: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public show() {
    this.visibility = true;
  }

  public hide() {
    this.visibility = false;
  }

}
