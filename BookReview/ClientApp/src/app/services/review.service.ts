import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Book } from "../models/book";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/Review/";

  toggleReviewItem(userId: number, bookId: number, comment: string) {
    return this.http.post<Book[]>(
      this.baseURL + `CreateReviewlist/${userId}/${bookId}/${comment}`,
      {}
    );
  }

  getReviewUser(userId: number) {
    return this.http.get<string>(
      this.baseURL + `GetReviewCommentUser/${userId}`,
      {}
    );
  }

  getReviewItems(userId: number) {
    return this.http.get<Book[]>(this.baseURL + userId);
  }

  clearReview(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`);
  }
}
