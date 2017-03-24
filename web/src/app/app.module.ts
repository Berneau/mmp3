import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    LandingPageComponent,
    LoginComponent,
    FooterBarComponent,
    ProductListComponent,
    VendorListComponent,
    SearchResultsComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
