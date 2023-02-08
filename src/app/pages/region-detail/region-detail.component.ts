import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FishDetails } from 'src/app/models/fisheries';

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.css']
})
export class RegionDetailComponent implements OnInit {
  fishDetails: FishDetails[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: DataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.service.setDetails(Number(id));
    });


    this.service.selectedFishDetail$.subscribe(value => {
      this.fishDetails = value;
    })
  }
  setDetails() {
  }


}
