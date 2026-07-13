import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-roster',
  imports: [Navbar],
  templateUrl: './roster.html',
  styleUrl: './roster.css',
})
export default class Roster {}
