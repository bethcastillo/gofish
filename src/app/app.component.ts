import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
import { Regions } from './models/fisheries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regions: Regions[] = [];
  constructor (private service: DataService) {}

  ngOnInit(): void {
    this.service.getFisheries().subscribe(response => {

      this.service.setFisheries(response);
      this.service.setRegions();

      this.service.selectedRegion$.subscribe((value) => {
        this.regions = value;
      });

      this.service.setRegionalData();

    });


  }

}
