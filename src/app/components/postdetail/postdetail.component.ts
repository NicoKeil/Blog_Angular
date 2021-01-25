import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.services';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css'],
  providers: [PostService, UserService]
})
export class PostdetailComponent implements OnInit {
	public post:Post;
	public status: string;
  public identity;
  public token;
  public url;
  constructor(
    private _userService: UserService,
  	private _postService: PostService,
  	private _route: ActivatedRoute,
  	private _router: Router
  	) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
  	this.getPost();
    this.url = global.url;
  }

  getPost(){
  	//Sacar el id del post de la url
  		this._route.params.subscribe(params => {

  			let id = +params['id'];
		// Peticion ajax para sacar los datos
		this._postService.getOnePost(id).subscribe(
			response => {
				if(response.status == 'success'){
					this.post = response.post
          console.log(this.post.image);
				}else{
					
				}
			},
			error => {
				this._router.navigate(['inicio']);
			}
			);
  		});
  	


  }
}
