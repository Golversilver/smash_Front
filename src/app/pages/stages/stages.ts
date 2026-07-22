import { Component, signal } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { StageService } from '../../services/stageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stages',
  imports: [Navbar],
  templateUrl: './stages.html',
  styleUrl: './stages.css',
})
export default class Stages {

  constructor(private stageService: StageService, private router: Router){}

  stages = signal<any[]>([]);

  ngOnInit(): void{
    this.getStages();
  }

  getStages(){

    this.stageService.getStages().subscribe({

      next: (resp) => {

        console.log(resp);
    
       this.stages.set(resp);

      },

      error: (err) => {
        console.log('❌ ERROR');
        console.log(err);
      }

    })

  }
}
