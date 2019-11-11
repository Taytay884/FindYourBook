import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userName: string = this.authenticationService.currentUserValue.name;
  public otherRoute = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.checkWhichRouteToShow();
  }

  private checkWhichRouteToShow() {
    if (this.router.url === '/home/book-finder') {
      this.otherRoute = 'wish-list';
    } else {
      if (this.router.url === '/home/wish-list') {
        this.otherRoute = 'book-finder';
      }
    }
  }

  public onRouteLinkClicked() {
    this.router.navigate([`/home/${this.otherRoute}`])
      .then(() => {
        this.checkWhichRouteToShow();
      });
  }

  public onLogoutClicked() {
    this.authenticationService.logout();
  }

}
