import { Component, signal } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Router, RouterLink } from '@angular/router';
import { RosterService } from '../../services/rosterService';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-roster',
  imports: [Navbar, RouterLink],
  templateUrl: './roster.html',
  styleUrl: './roster.css',
})
export default class Roster {

  constructor(private rosterService: RosterService, private router: Router){}

  roster = signal<any[]>([]);

  ngOnInit(): void {
    console.log('El componente se creó');
    this.loadRoster();
  }

  loadRoster(){

       this.rosterService.searchRoster().subscribe({

      next: (resp) => {

        console.log(resp);
    
       this.roster.set(resp);

      },

      error: (err) => {
        console.log('❌ ERROR');
        console.log(err);
      }

    });
   }

}
