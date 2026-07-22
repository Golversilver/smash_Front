import { Component, signal } from '@angular/core';
import { StatsService } from '../../../services/statsService';
import { Navbar } from "../../../components/navbar/navbar";
import { ActivatedRoute } from '@angular/router';
import { RosterService } from '../../../services/rosterService';

@Component({
  selector: 'app-matchups-stats',
  imports: [Navbar],
  templateUrl: './matchups-stats.html',
  styleUrl: './matchups-stats.css',
})
export default class MatchupsStats {

   constructor(private statsService: StatsService,  private route: ActivatedRoute, private rosterService: RosterService){}

   onlineFilter = signal<boolean | undefined>(undefined);
   roster = signal<any | undefined>(null);
   matchStats =  signal<any[]>([]);
   rosterId = signal(0);
   page = signal(1);
   limit = 1;
   totalPages = signal(1);

   ngOnInit() : void{
    const rosterId = Number(this.route.snapshot.paramMap.get('rosterId'));

    this.rosterId.set(rosterId);

    this.getMatchStats();
    this.getRoster();
   }
   

   getMatchStats(){

    this.statsService.getMatchsStats(this.page(), this.limit,this.rosterId(), this.onlineFilter()).subscribe({
       next: (resp) =>{
          this.matchStats.set(resp.data);
          this.totalPages.set(resp.totalPages);
          console.log(resp);
       },
       error: (err) =>{
          console.log(err)
       }

    })
   }

   getRoster(){
      this.rosterService.searchRosterId(this.rosterId()).subscribe({

       next: (resp) =>{
          this.roster.set(resp);
          console.log(resp);
       },
       error: (err) =>{
          console.log(err)
       }

      })
   }

   selectOnline(online: boolean | undefined) {
     this.onlineFilter.set(online);
     this.getMatchStats();
   }

   nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
      this.getMatchStats();
    }
  }

  previousPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.getMatchStats();
    }
  }

}
