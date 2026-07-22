import { Component, signal } from '@angular/core';
import { Navbar } from "../../../components/navbar/navbar";
import { StatsService } from '../../../services/statsService';

@Component({
  selector: 'app-roster-stats',
  imports: [Navbar],
  templateUrl: './roster-stats.html',
  styleUrl: './roster-stats.css',
})
export default class RosterStats {

  constructor(private statsService: StatsService){}

   onlineFilter = signal<boolean | undefined>(undefined);
   rosterStats =  signal<any[]>([]);

   ngOnInit() : void{
    this.getRosterStats();
   }

   getRosterStats(){

    this.statsService.getRosterStats(this.onlineFilter()).subscribe({

       next: (resp) =>{
          this.rosterStats.set(resp);
          console.log(resp);
       },
       error: (err) =>{
          console.log(err)
       }

    })
    
   }

   selectOnline(online: boolean | undefined) {
     this.onlineFilter.set(online);
     this.getRosterStats();
   }

}
