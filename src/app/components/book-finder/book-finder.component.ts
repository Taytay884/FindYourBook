import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {WishlistService} from "../../services/wishlist.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BookFinderService} from "../../services/book-finder.service";

@Component({
  selector: 'app-book-finder',
  templateUrl: './book-finder.component.html',
  styleUrls: ['./book-finder.component.scss']
})
export class BookFinderComponent implements OnInit {

  public books: Book[];
  public lastQuery: string;
  public previewBook: any = null;
  public bookName = new FormControl();
  public bookForm: FormGroup = this.formBuilder.group({
    bookName: this.bookName
  });
  public pagesAmount = 1;
  public currentPage = 1;
  public ITEMS_PER_PAGE = 3;
  public isLoading = false;
  public isPreviewBookAddedToWishList = false;

  constructor(private formBuilder: FormBuilder, private wishlistService: WishlistService,
              private modalService: NgbModal, private bookFinderService: BookFinderService) {
    this.lastQuery = this.bookFinderService.lastQuery || '';
    this.books = bookFinderService.getBooks();
    this.calcPagesAmount();
  }

  ngOnInit() {
    this.bookName.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((bookNameInput) => {
        this.onSearchInput(bookNameInput);
      }
    );
  }

  public onSearchInput(input: string) {
    if (!input) {
      this.books = [];
      return;
    }
    this.isLoading = true;
    this.bookFinderService.search(input).finally(() => {
        this.books = this.bookFinderService.getBooks();
        this.isLoading = false;
        this.calcPagesAmount();
      });
  }

  public chooseBook(book: any, content) {
    this.previewBook = book;
    this.openModal(content);
    this.isPreviewBookAddedToWishList = false;
  }

  private openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  public onAddToWishlistButtonClicked() {
    this.wishlistService.add(this.previewBook);
    this.isPreviewBookAddedToWishList = true;
  }

  private calcPagesAmount() {
    this.pagesAmount = Math.ceil(this.books.length / this.ITEMS_PER_PAGE);
  }

  public getCurrentPageBooks() {
    const firstBookIndex = (this.currentPage - 1) * this.ITEMS_PER_PAGE;
    const lastBookIndex = (this.ITEMS_PER_PAGE * this.currentPage) - 1;
    const currentPageBooks = this.books.filter((book, index) => {
      return (index >= firstBookIndex && index <= lastBookIndex);
    });
    return currentPageBooks;
  }

  public movePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
