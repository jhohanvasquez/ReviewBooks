import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubscriptionService {
  descriptionFilterValue$ = new BehaviorSubject<number>(Number.MAX_SAFE_INTEGER);
}
