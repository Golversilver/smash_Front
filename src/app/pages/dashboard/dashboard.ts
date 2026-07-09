import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Table } from "../../components/table/table";

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard {}
