import { Component } from '@angular/core';
import {WishlistService} from "../../services/wishlist.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {

  public wishlistBooks;
  public bookToRemove: Book;
  private bookToRemoveIdx: number;

  constructor(private wishlistService: WishlistService, private modalService: NgbModal) {
    this.wishlistBooks = wishlistService.getAll();
  }

  onRemoveConfirmed() {
    this.wishlistBooks.splice(this.bookToRemoveIdx, 1);
    this.wishlistService.remove(this.bookToRemove.id);
  }

  public openRemoveBookModal(content, idx) {
    this.bookToRemove = this.wishlistBooks[idx];
    this.bookToRemoveIdx = idx;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

}
