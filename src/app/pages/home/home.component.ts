import { RegionalData } from './../../models/fisheries';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  regionalData: RegionalData[] = [];

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.selectedRegionalData$.subscribe(value => {
      this.regionalData = value;
    });
  }
}
