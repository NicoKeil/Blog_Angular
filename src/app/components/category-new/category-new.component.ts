import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CategoryService } from '../../services/category.services';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
	public page_title: string;
	public category: Category;
	public identity;
	public token;
	public status: string;

  constructor(
  	private _userService: UserService,
  	private _router: Router,
  	private _route: ActivatedRoute,
  	private _categoryService: CategoryService
  	
  	) { 
  	this.page_title = "Crear categoria";

  	
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
  	this._categoryService.create(this.token, this.category).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.category = response.category;
  				this.status = 'success';

  				this._router.navigate(['/inicio']);
  			}else{
  				this.status = 'error';
  			}

  		},
  		error => {
  			this.status = 'error';
  			console.log(<any>error);
  		}
  		);
  }

  

}
