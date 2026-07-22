import { Component, signal } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { NgSelectComponent } from "@ng-select/ng-select";
import { CharacterService } from '../../services/characterService';
import { DashboardService } from '../../services/dashboardService';
import { GameService } from '../../services/gameService';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { RouterLink } from "@angular/router";
import { RosterService } from '../../services/rosterService';


@Component({
  selector: 'app-dashboard',
  imports: [Navbar, NgSelectComponent, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard {

  getTimeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: es,
  });
}

  constructor(private dashboardService: DashboardService,private gameService: GameService, private rosterService: RosterService){}

  selectedCharacter = signal<any | null>(null);
  
  winRate = signal({
    games: 0,
    wins: 0,
    winRate: 0,
  });

  cards = signal<any | null>(null);
  roster =  signal<any[]>([]);
  games =  signal<any[]>([]);
  onlineFilter = signal<boolean | undefined>(undefined);

  page = signal(1);
  limit = 10;
  totalPages = signal(1);

  ngOnInit() : void{

    this.getCharacters();
    this.getGames();
    this.getWinRate();
    this.getCards();

  }

  getCharacters (){

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

  getGames(){
    this.gameService.getGames(this.page(), this.limit, this.selectedCharacter()?.id, this.onlineFilter()).subscribe({

       next: (resp) =>{
          this.games.set(resp.data);
          this.totalPages.set(resp.totalPages);
       }

    })
  }

  getWinRate(){
      this.dashboardService.winRate(this.selectedCharacter()?.id, this.onlineFilter()).subscribe({

       next: (resp) =>{
          this.winRate.set(resp);
          console.log(resp);
       },
       error: (err) =>{
          console.log(err)
       }

    })
  }
  

  seleccionarPersonaje(character: any) {
      this.selectedCharacter.set(character);
      this.page.set(1);
      this.getGames();
      this.getWinRate();
      this.getCards();
  }

  getCards(){

     this.dashboardService.getCards(this.selectedCharacter()?.id, this.onlineFilter()).subscribe({

       next: (resp) =>{
          this.cards.set(resp);
          console.log(resp);
       },
       error: (err) =>{
          console.log(err)
       }

     })

  }

  paginaSiguiente() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
      this.getGames();
    }
  }

  paginaAnterior() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.getGames();
    }
  }

  seleccionarModalidad(online: boolean | undefined) {

    this.onlineFilter.set(online);
    this.page.set(1);
    this.getGames();
    this.getWinRate();
    this.getCards();

  }

}
