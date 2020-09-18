import { Component, OnInit } from '@angular/core';


import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {


  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        {label: ''}
    ]); 
  }

  ngOnInit(): void {
  }


}
