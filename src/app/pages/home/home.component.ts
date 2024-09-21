import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderProfileComponent } from 'src/app/components/header-profile/header-profile.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { AuthService } from 'src/app/services/auth-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, NavbarComponent, HeaderProfileComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Correção: deve ser styleUrls
})
export class HomeComponent implements OnInit {

  userRole: string = ''; 
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
          this.userRole = `${user.role}`;
        },
        (error) => {
          console.error('Erro ao obter informações do usuário', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado na sessão');
    }
  }


}