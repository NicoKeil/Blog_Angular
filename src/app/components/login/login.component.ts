import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

	public page_title: string;
	public user: User;
	public status: string;
	public token;
	public identity;

  constructor(
  	private _userService: UserService,
  	private _router: Router,
  	private _route: ActivatedRoute

  	) {
  	this.page_title = 'Identificate';
  	this.user = new User(1, '', '', 'user', '', '', '', '');
  }

  ngOnInit(): void {
  	//se ejecuta siempre y cierra sesion cuando le llega el parametro sure por la url
  	this.logout();
  }

   onSubmit(form){
  		this._userService.signup(this.user).subscribe(
  			response => {
  				//TOKEN
				if(response.status != 'error'){
					this.status = 'succes'
					this.token = response;

				//Objeto del usuario identificado
				 	this._userService.signup(this.user, true).subscribe(
			  			response => {
							this.identity = response;

							//Persistir datos usuario identificado 
							console.log(this.token);
							console.log(this.identity);

							localStorage.setItem('token', this.token);
							localStorage.setItem('identity', JSON.stringify(this.identity));

							//redirección a inicio
							this._router.navigate(['inicio']);	
			  			},
			  			error => {
			  				this.status = 'error';
			  				console.log(<any>error)
			  			}
			  		);
				}else{
					this.status = 'error';
				}
  			},
  			error => {
  				this.status = 'error';
  				console.log(<any>error)
  			}
  		);
	}

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];
			console.log(params['sure']);
			if(logout == 1){

				localStorage.removeItem('token');
				localStorage.removeItem('identity');
				

				this.identity = null;
				this.token = null;

				//redirección a inicio
				this._router.navigate(['inicio']);
			}
		});

	}
	
}
