import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { SharedLibModule } from '@expense-settler-monorepo/shared-lib';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, SharedLibModule],
  selector: 'expense-settler-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'es-web';
}
