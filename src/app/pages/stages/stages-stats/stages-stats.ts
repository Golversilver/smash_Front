import { Component, signal } from '@angular/core';
import { Navbar } from "../../../components/navbar/navbar";
import { StatsService } from '../../../services/statsService';
import { CharacterService } from '../../../services/characterService';
import { NgSelectComponent } from "@ng-select/ng-select";
import { RosterService } from '../../../services/rosterService';

@Component({
  selector: 'app-stages-stats',
  imports: [Navbar, NgSelectComponent],
  templateUrl: './stages-stats.html',
  styleUrl: './stages-stats.css',
})
export default class StagesStats {

  constructor(private statsService: StatsService, private rosterService: RosterService){}

  selectedRoster = signal<any | null>(null);
  roster =  signal<any[]>([]);
  stagesStats =  signal<any[]>([]);
  onlineFilter = signal<boolean | undefined>(undefined);

   ngOnInit() : void{

    this.getRoster();
    this.getStagesStats();
    
   }

   getStagesStats(){

    this.statsService.getStagesStats(this.selectedRoster()?.id, this.onlineFilter()).subscribe({
        next: (resp) =>{
          this.stagesStats.set(resp);
          console.log(resp);
       },
       error: (err) =>{
          console.log(err)
       }
    })

   }

  getRoster(){

     this.rosterService.searchRoster().subscribe({

        next: (resp) =>{
          this.roster.set(resp);
          console.log("personajes traidos")
        },
        error: (err) =>{
          console.log(err);
        }

     })
  }

  selectRoster(character: any) {
      this.selectedRoster.set(character);
      this.getStagesStats();
  }

  selectOnline(online: boolean | undefined) {
    this.onlineFilter.set(online);
    this.getStagesStats();
  }

}
