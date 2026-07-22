import { Routes } from '@angular/router';

export const routes: Routes = [

    {
       path:'InicioSesion',
       loadComponent: () => import('./pages/login/login')
    },
    {
       path: 'registro',
       loadComponent: () => import('./pages/register/register')
    },
    {
       path: 'panelPrincipal',
       loadComponent: () => import('./pages/dashboard/dashboard')
    },
    {
       path: 'perfil',
       loadComponent: () => import('./pages/profile/profile')
    },
    {
       path: 'elenco',
       children: [
         {
            path: '',
            loadComponent: () => import('./pages/roster/roster')
         },
         {
            path: 'crear',
            loadComponent: () => import('./pages/roster/rosterCreate/rosterCreate')
         },
         {
            path: 'estadisticas',
            loadComponent: () => import('./pages/roster/roster-stats/roster-stats')
         },
         {
            path: 'enfrentamientos/estadisticas/:rosterId',
            loadComponent: () => import('./pages/roster/matchups-stats/matchups-stats')
         }
       ]
       
    },
    {
      path: 'nuevoCombate',
      loadComponent: () => import('./pages/games/newGame/newGame')
    },
    {
      path: 'escenarios',
      children: [
         {
            path: '',
            loadComponent: () => import('./pages/stages/stages')
         },
         {
            path: 'estadisticas',
            loadComponent: () => import('./pages/stages/stages-stats/stages-stats')
         }
       ]
     
    },
    {
      path: 'notas/:id',
      children: [
         {
            path: '',
            loadComponent: () => import('./pages/notes/notes')
         },
         {
            path: 'crearNota',
            loadComponent: () => import('./pages/notes/notes-Form/notes-Form')
         },
         {
            path: 'editarNota/:noteId',
            loadComponent: () => import('./pages/notes/notes-Form/notes-Form')
         },
      ]
      
    },
    {
      path: 'notas-publicas/:id',
      children: [
         {
            path: '',
            loadComponent: () => import('./pages/publicNotes/publicNotes')
         },
         {
            path: 'copiarNota/:noteId',
            loadComponent: () => import('./pages/publicNotes/public-notes-Form/public-notes-Form')
         },
      ]
      
    },

    {
    path: "**",
    redirectTo: "InicioSesion"
    }
];
