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
            loadComponent: () => import('./pages/roster/create/rosterCreate')
         }
       ]
       
    },
    {
       path: 'nuevoCombate',
       loadComponent: () => import('./pages/games/form/game-form')
    },
    {
       path: 'escenarios',
       loadComponent: () => import('./pages/stages/stages')
    },

    {
    path: "**",
    redirectTo: "InicioSesion"
    }
];
