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
       path: 'PanelPrincipal',
       loadComponent: () => import('./pages/dashboard/dashboard')
    },
    {
       path: 'Perfil',
       loadComponent: () => import('./pages/dashboard/dashboard')
    },

    {
    path: "**",
    redirectTo: "InicioSesion"
    }
];
