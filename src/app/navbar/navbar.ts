import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {}
