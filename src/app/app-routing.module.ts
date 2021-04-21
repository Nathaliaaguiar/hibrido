import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// 1) Importa dependências
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';

// 2) Redirecionamentos

// Usuário não logado? Vai para login.
const toLogin = () => redirectUnauthorizedTo(['/user/login']);

// Usuário está logado? Vai para a página inicial.
const isLogged = () => redirectLoggedInTo(['/register']);

const routes: Routes = [

  // Rota para a página inicial
  {
    path: '',
    redirectTo: 'user/profile',
    pathMatch: 'full'
  },

  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then(m => m.NewsPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'user/login',
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),

    // Só pode ser vista se não logado
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isLogged }
  },
  {
    path: 'user/logout',
    loadChildren: () => import('./user/logout/logout.module').then(m => m.LogoutPageModule),

    // Só pode ser vista se logado
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'user/profile',
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),

    // Só pode ser vista se logado
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    // Página de cadastro
    path: 'register',
    loadChildren: () => import('./user/register/register.module').then(m => m.RegisterPageModule),

    // Só pode ser vista se logado
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./user/edit/edit.module').then( m => m.EditPageModule)
  },

  // Página de erro 404
  // '**' TEM QUE SER SEMPRE A ÚLTIMA ROTA
  {
    path: '**',
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
