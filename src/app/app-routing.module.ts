import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {HomeComponent} from "./components/home/home.component";
import {BookFinderComponent} from "./components/book-finder/book-finder.component";
import {WishListComponent} from "./components/wish-list/wish-list.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: 'book-finder', component: BookFinderComponent},
      {path: 'wish-list', component: WishListComponent},
      {path: '', pathMatch: 'full', redirectTo: 'book-finder'}]
  },
  {path: '**', redirectTo: '/welcome'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
