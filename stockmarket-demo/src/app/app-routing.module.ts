import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'stockmarket', component: StockComponent},
  { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: 'home',  component: HomeComponent},
  { path: 'introduction', component: IntroductionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
