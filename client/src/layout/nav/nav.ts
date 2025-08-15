import { AccountService } from './../../core/services/account-service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService)
  private toast = inject(ToastService)
  private router = inject(Router)
  protected creds: any = {}

  login(){
    // console.log(this.creds);
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/menu');
        this.creds = {};
        this.toast.success('Logged in succsesfully')
      },
      error: error => {
        this.toast.error(error.error);
      },
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
