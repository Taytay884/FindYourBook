import {Injectable} from '@angular/core';
const LOCAL_STORAGE_KEY_WISHLISTBOOKS = 'wishlistBooks';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistBooks: any[];

  constructor() {
    this.wishlistBooks = JSON.parse(localStorage.getItem('wishlistBooks')) || [];
  }

  add(book: any) {
    if (this.wishlistBooks.findIndex((wishlistBook) => {
      return wishlistBook.id === book.id;
    }) !== -1) {
      alert('This book is already on the wishlist.');
      return;
    }
    this.wishlistBooks.push(book);
    localStorage.setItem(LOCAL_STORAGE_KEY_WISHLISTBOOKS, JSON.stringify(this.wishlistBooks));
  }

  getAll() {
    return JSON.parse(JSON.stringify(this.wishlistBooks));
  }

  remove(bookId: string) {
    const bookIdx = this.wishlistBooks.findIndex((wishlistBook) => wishlistBook.id === bookId);
    this.wishlistBooks.splice(bookIdx, 1);
    localStorage.setItem(LOCAL_STORAGE_KEY_WISHLISTBOOKS, JSON.stringify(this.wishlistBooks));
  }

}
