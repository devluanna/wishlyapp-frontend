import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-header-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-profile.component.html',
  styleUrl: './header-profile.component.scss'
})
export class HeaderProfileComponent {
  userInitials: string = ''; 
  userFullName: string = '';
  userEmail: string = '';
  userRole: string = '';
  userStatus: string = '';
  userIdentity: string = '';
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
          this.userInitials = `${user.first_name.charAt(0)} ${user.last_name.charAt(0)}`;
          this.userFullName = `${user.first_name} ${user.last_name}`;
          this.userEmail =  `${user.email}`;
          this.userRole =  `${user.role}`;
          this.userStatus =  `${user.status}`;
          this.userIdentity = `${user.identity}`;
        },
        (error) => {
          console.error('Erro ao obter informações do usuário', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado na sessão');
    }
  }

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }


}
