import { Routes } from '@angular/router';

export const routes: Routes = [

    {
       path:'InicioSesion',
       loadComponent: () => import('./app/pages/login/login')
    },
    {
       path: 'registro',
       loadComponent: () => import('./app/pages/register/register')
    },
    {
       path: 'PanelPrincipal',
       loadComponent: () => import('./app/pages/dashboard/dashboard')
    },
    {
       path: 'perfil',
       loadComponent: () => import('./app/pages/login/login')
    },

    {
    path: "**",
    redirectTo: "InicioSesion"
    }
];
