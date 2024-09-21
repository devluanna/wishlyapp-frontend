import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userInitials: string = ''; 
  isSidebarOpen: boolean = true;  
  userName: string = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
          this.userInitials = `${user.first_name.charAt(0)} ${user.last_name.charAt(0)}`;
          this.userName = `${user.username}`;
        },
        (error) => {
          console.error('Erro ao obter informações do usuário', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado na sessão');
    }
  }

  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
