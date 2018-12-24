import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, // pathMatch - чтобы ангуляр понял что это абсолютный путь
  {path: 'system', loadChildren: './system/system.module#SystemModule'},
  // todo not 404
  // {path: '**', component: NotFoundComponent}7
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
