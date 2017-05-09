import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise'

import { MaterializeModule } from 'ng2-materialize';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { SlideNavComponent } from './slide-nav/slide-nav.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { ProductService } from './services/product.service';
import { VendorService } from './services/vendor.service';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { LoginService } from './services/login.service';

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
  { path: 'produkt', redirectTo: 'produkte', pathMatch: 'full' },
  {
    path: 'produkt',
    children: [
      { path: ':id', component: ProductDetailComponent }
    ]
  },
  { path: 'rezepte', component: RecipeListComponent },
  {
    path: 'rezepte',
    children: [
      { path: ':id', component: RecipeDetailComponent }
    ]
  },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    LandingPageComponent,
    LoginComponent,
    FooterBarComponent,
    VendorListComponent,
    SearchResultsComponent,
    RecipeListComponent,
    CategoryListComponent,
    SlideNavComponent,
    VendorProfileComponent,
    RecipeDetailComponent,
    ProductDetailComponent,
    CategoryDetailComponent,
    AdminDashboardComponent,
    VendorFormComponent,
    ProductFormComponent
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
    LoginService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
