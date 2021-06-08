import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from './services/data-resolver.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuardService] },
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule', canActivate: [AuthGuardService] },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule', canActivate: [AuthGuardService] },
  { path: 'add-users', loadChildren: './add-user/add-user.module#AddUserPageModule', canActivate: [AuthGuardService] },
  { path: 'list-users', loadChildren: './list-user/list-user.module#ListUserPageModule', canActivate: [AuthGuardService] },
  { path: 'add-case', loadChildren: './add-case/add-case.module#AddCasePageModule', canActivate: [AuthGuardService] },
  {
    path: 'search-case',
    loadChildren: './search-case/search-case.module#SearchCasePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-case/:id',
    resolve: {
      special: DataResolverService
    },
    canActivate: [AuthGuardService],
    loadChildren: './edit-case/edit-case.module#EditCasePageModule'
  },
  { path: 'search-area', loadChildren: './search-area/search-area.module#SearchAreaPageModule', canActivate: [AuthGuardService] },
  { path: 'add-aidarea', loadChildren: './add-aidarea/add-aidarea.module#AddAidareaPageModule', canActivate: [AuthGuardService] },
  {
    path: 'edit-area/:id',
    resolve: {
      special: DataResolverService
    },
    canActivate: [AuthGuardService],
    loadChildren: './edit-area/edit-area.module#EditAreaPageModule'
  },

  { path: 'search-user', loadChildren: './search-user/search-user.module#SearchUserPageModule', canActivate: [AuthGuardService] },
  {
    path: 'edit-user/:id',
    resolve: {
      special: DataResolverService
    },
    canActivate: [AuthGuardService],
    loadChildren: './edit-user/edit-user.module#EditUserPageModule'
  },
  {
    path: 'add-comments/:id',
    resolve: {
      special: DataResolverService
    },
    canActivate: [AuthGuardService],
    loadChildren: './add-comments/add-comments.module#AddCommentsPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'template/:id', resolve: {
      special: DataResolverService
    }, 
    loadChildren: './template/template.module#TemplatePageModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
