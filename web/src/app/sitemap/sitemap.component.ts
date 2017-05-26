import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.less']
})
export class SitemapComponent implements OnInit {

  sites: Object[]

  constructor(private router: Router) {
    this.sites = []
  }

  ngOnInit() {
    this.getSites()
  }

  getSites() {
    for (let r of this.router.config) {
      if (r.component && !r.canActivate && r.path !== '404' && r.path !== 'suche') {
        if (r.path === '') {
          this.sites.push({ name: 'Home', path: '' })
        }
        else {
          let name = r.path.slice(0, 1).toUpperCase() + r.path.slice(1)
          this.sites.push({ name: name, path: `/${r.path}` })
        }
      }
    }
  }

}
