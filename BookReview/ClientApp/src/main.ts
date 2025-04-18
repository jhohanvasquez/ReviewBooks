import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { AppComponent } from "./app/app.component";
import { ErrorInterceptorService } from "./app/interceptors/error-interceptor.service";
import { HttpInterceptorService } from "./app/interceptors/http-interceptor.service";
import { APP_ROUTES } from "./app/routes/app.routes";
import { AuthEffects } from "./app/state/effects/auth.effects";
import { BookEffects } from "./app/state/effects/book.effects";
import { ReviewEffects } from "./app/state/effects/review.effects";
import { CategoriesEffects } from "./app/state/effects/categories.effects";
import {
  AUTH_FEATURE_KEY,
  authReducer,
} from "./app/state/reducers/auth.reducers";
import {
  BOOK_FEATURE_KEY,
  bookReducer,
} from "./app/state/reducers/book.reducers";
import {
  REVIEW_FEATURE_KEY,
  reviewReducer,
} from "./app/state/reducers/review.reducers";
import {
  CATEGORIES_FEATURE_KEY,
  categoryReducer,
} from "./app/state/reducers/categories.reducers";
import { ROUTER_FEATURE_KEY } from "./app/state/selectors/router.selectors";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(
      withInterceptors([HttpInterceptorService, ErrorInterceptorService])
    ),
    provideAnimations(),
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
      })
    ),
    provideStore(),
    provideEffects(
      CategoriesEffects,
      BookEffects,
      ReviewEffects,
      AuthEffects
    ),
    provideState({ name: CATEGORIES_FEATURE_KEY, reducer: categoryReducer }),
    provideState({ name: BOOK_FEATURE_KEY, reducer: bookReducer }),
    provideState({ name: REVIEW_FEATURE_KEY, reducer: reviewReducer }),
    provideState({ name: AUTH_FEATURE_KEY, reducer: authReducer }),
    provideRouterStore(),
    provideStore({ [ROUTER_FEATURE_KEY]: routerReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
}).catch((err) => console.error(err));
