import { FishDetails, FisheryData, RegionalData, Regions } from './../models/fisheries';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  fisheryData: FisheryData[] = [];
  private fisheryData$ = new BehaviorSubject<FisheryData[]>(this.fisheryData);
  selectedFisheryData$ = this.fisheryData$.asObservable();

  regions: Regions[] = [];
  private region$ = new BehaviorSubject<Regions[]>(this.regions);
  selectedRegion$ = this.region$.asObservable();

  regionalData: RegionalData[] = [];
  private regionalData$ = new BehaviorSubject<RegionalData[]>(this.regionalData);
  selectedRegionalData$ = this.regionalData$.asObservable();

  fishDetails: FishDetails[] = [];
  private fishDetail$ = new BehaviorSubject<FishDetails[]>(this.fishDetails);
  selectedFishDetail$ = this.fishDetail$.asObservable();

  constructor(private http: HttpClient) { }



  getFisheries(): Observable<FisheryData[]> {
    return this.http.get<FisheryData[]>(environment.gofishApiBaseUrl + 'apikey=' + environment.APIKey);;
  }

  setFisheries(fishery: FisheryData[]) {
    this.fisheryData$.next(fishery);
  }

  setRegions(): Regions[] {

    this.selectedFisheryData$.subscribe(value => {
      this.fisheryData = value;
    })

    this.fisheryData.forEach(fishery => {

      this.addToRegions(fishery.NOAAFisheriesRegion);
      this.region$.next(this.regions);

    });

    return this.regions;
  }

  addToRegions(region: string) {
    const len = this.regions.length;
    const id = len + 1;
    const found = this.regions.find(a => a.name === region);
    if (!found) {
      this.regions.push({ id, name: region });
    }
  }

  setRegionalData() {
    this.parseRegionalData();
    this.regionalData$.next(this.regionalData);
  }

  parseRegionalData() {

    this.regions.forEach(region => {

      let sumCalories = 0;
      let calorieCount = 0;
      let averageCalories = 0;
      let sumFat = 0;
      let fatCount = 0;
      let averageFat = 0;
      let fishies: FishDetails[] = [];
      let data: FisheryData[] = [];


      this.fisheryData.forEach(fishery => {
        let calories = 0;
        let caloriesPer = 0;
        let fat = 0;
        let fatPer = 0;
        let servings = 1;
        if (fishery.NOAAFisheriesRegion === region.name) {

          if (fishery.Servings !== undefined && !isNaN(parseFloat(fishery.Servings))) {
            servings = parseFloat(fishery.Servings);
          }
          if (fishery.Calories !== undefined && parseFloat(fishery.Calories) > 0) {
            calories = parseFloat(fishery.Calories);
          }
          if (fishery.FatTotal !== undefined && parseFloat(fishery.FatTotal) > 0) {
            fat = parseFloat(fishery.FatTotal);
          }

          if (servings > 0 && calories > 0) {
            caloriesPer = calories / servings;
            sumCalories += caloriesPer
            calorieCount++;
          }

          if (servings > 0 && fat > 0) {
            fatPer = fat / servings;
            sumFat += fatPer;
            fatCount ++;
          }
          if (fishery.SpeciesName) {
            let fish: FishDetails = {
              fishName: fishery.SpeciesName,
              imageUrl: fishery.SpeciesIllustrationPhoto.src,
              caloriesPerServing: caloriesPer,
              fatPerServing: fatPer,
              description: fishery.Quote
            };
            fishies.push(fish);
          }
        }

      })
      averageCalories = sumCalories / calorieCount;
      averageFat = sumFat / fatCount;

      let regionData: RegionalData = {
        region: region.name,
        regionId: region.id,
        averageCalories,
        averageFat,
        fishDetails: fishies
      }
      this.regionalData.push(regionData);


    });
  }

  setDetails(id: number) {

    const index = this.regionalData.findIndex(item => Number(item.regionId) === id );
    this.fishDetails = this.regionalData[index].fishDetails;
    this.fishDetail$.next(this.fishDetails);
  }
}
