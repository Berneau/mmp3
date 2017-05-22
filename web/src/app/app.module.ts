import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise'

import { MaterializeModule } from 'ng2-materialize';

import { AdminGuard } from './guards/admin.guard';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { SlideNavComponent } from './slide-nav/slide-nav.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { PostitListComponent } from './postit-list/postit-list.component';
import { PostitDetailComponent } from './postit-detail/postit-detail.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPostitListComponent } from './admin-postit-list/admin-postit-list.component';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { AdminTypeListComponent } from './admin-type-list/admin-type-list.component';
import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { PostitFormComponent } from './postit-form/postit-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { TypeFormComponent } from './type-form/type-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { VendorShortInfoComponent } from './vendor-short-info/vendor-short-info.component';
import { SearchFieldComponent } from './search-field/search-field.component';

import { ProductService } from './services/product.service';
import { VendorService } from './services/vendor.service';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { LoginService } from './services/login.service';
import { EventService } from './services/event.service';
import { PostitService } from './services/postit.service';
import { TypeService } from './services/type.service';
import { SearchService } from './services/search.service';
import { UserService } from './services/user.service';

import { PostitConfirmedPipePipe } from './pipes/postit-confirmed-pipe.pipe';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'produzenten', component: VendorListComponent },
  {
    path: 'produzenten',
    children: [
      { path: ':id', component: VendorProfileComponent }
    ]
  },
  { path: 'produkte', component: CategoryListComponent },
  {
    path: 'produkte',
    children: [
      { path: ':id', component: CategoryDetailComponent }
    ]
  },
  { path: 'events', component: EventListComponent },
  {
    path: 'events',
    children: [
      { path: ':id', component: EventDetailComponent }
    ]
  },
  // { path: 'rezepte', component: RecipeListComponent },
  // {
  //   path: 'rezepte',
  //   children: [
  //     { path: ':id', component: RecipeDetailComponent }
  //   ]
  // },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'suche', component: SearchResultsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    FooterBarComponent,
    SlideNavComponent,
    LandingPageComponent,
    LoginComponent,
    SearchResultsComponent,
    VendorListComponent,
    VendorProfileComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    EventListComponent,
    EventDetailComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    AdminDashboardComponent,
    VendorFormComponent,
    ProductFormComponent,
    PostitListComponent,
    PostitDetailComponent,
    PostitFormComponent,
    UserFormComponent,
    CategoryFormComponent,
    TypeFormComponent,
    EventFormComponent,
    VendorShortInfoComponent,
    SearchFieldComponent,
    PostitConfirmedPipePipe,
    AdminPostitListComponent,
    AdminCategoryListComponent,
    AdminTypeListComponent,
    AdminEventListComponent
  ],
  entryComponents: [
    PostitFormComponent,
    UserFormComponent,
    CategoryFormComponent,
    TypeFormComponent,
    EventFormComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule.forRoot()
  ],
  providers: [
    ProductService,
    VendorService,
    RecipeService,
    CategoryService,
    LoginService,
    AdminGuard,
    EventService,
    PostitService,
    TypeService,
    SearchService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
