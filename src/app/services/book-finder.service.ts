import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookFinderService {

  private searchedBooks: any[] = [];
  public lastQuery: string;

  constructor(private http: HttpClient) {
  }

  getBooks() {
    return JSON.parse(JSON.stringify(this.searchedBooks));
  }

  search(query: string): Promise<null> {
    this.lastQuery = query;
    return new Promise((resolve, reject) => {
      this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`).subscribe((res: any) => {
          this.searchedBooks = res.items.map((item) => this.transformVolumeToBookModel(item));
          resolve();
        }, () => {
          this.searchedBooks = [];
          reject();
        })
    });
  }

  private transformVolumeToBookModel(volumeItem: any): Book {
    const book = {
      id: volumeItem.id,
      title: volumeItem.volumeInfo.title,
      subtitle: volumeItem.volumeInfo.subtitle,
      author: volumeItem.volumeInfo.authors ? volumeItem.volumeInfo.authors[0] : 'Unknown author',
      imageSrc: volumeItem.volumeInfo.imageLinks && volumeItem.volumeInfo.imageLinks.thumbnail,
      categories: volumeItem.volumeInfo.categories || []
    };
    return book;
  }
}
