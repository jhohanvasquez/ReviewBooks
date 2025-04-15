import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { HomeComponent } from "../components/home/home.component";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { AuthGuard } from "../guards/auth.guard";
import { RegisterEffects } from "../state/effects/register.effects";
import {
  REGISTER_FEATURE_KEY,
  registerReducer,
} from "../state/reducers/register.reducer";

export const APP_ROUTES: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full", title: "Home" },
  { path: "filter", component: HomeComponent, title: "Home | Filter Reviews" },
  { path: "search", component: HomeComponent, title: "Home | Search Reviews" },
  {
    path: "login",
    loadComponent: () =>
      import("../components/login/login.component").then(
        (c) => c.LoginComponent
      ),
    title: "Login",
  },
  {
    path: "register",
    providers: [
      provideEffects([RegisterEffects]),
      provideState(REGISTER_FEATURE_KEY, registerReducer),
    ],
    loadComponent: () =>
      import(
        "../components/user-registration/user-registration.component"
      ).then((c) => c.UserRegistrationComponent),
    title: "Register",
  },
  {
    path: "books/details/:id",
    loadComponent: () =>
      import("../components/book-details/book-details.component").then(
        (c) => c.BookDetailsComponent
      ),
    title: "Book Details",
  },
  { path: "**", component: PageNotFoundComponent, title: "Not Found" },
];
