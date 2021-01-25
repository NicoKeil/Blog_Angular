import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService} from '../../services/post.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
public page_title: string;
	public url;
	public status: string;
	public posts: Array<Post>;
  public user: User;
	public identity;
	public token;
  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _postService: PostService,
  	private _userService: UserService
  	) {
  	this.url = global.url
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
   }

ngOnInit(): void {
	this.getProfile();
  
  }

  getProfile(){
	//Sacar el id del post de la url
  	this._route.params.subscribe(params => {
		let userId = +params['id'];
	  	this.getPosts(userId);
      this.getUser(userId);
	  });

  }

  getUser(userId){
    this._userService.getUserbyid(userId).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.user;
           console.log(this.user);
        }else{
          console.log(response);
        }
        
      },
      error => {
        console.log(error);
      }
      );
  }

  getPosts(userId){
  	this._userService.getPostbyid(userId).subscribe(
  		response => {
  			if(response.status == 'success'){
  				this.posts = response.posts;
  				
  			}else{
  				console.log(response);
  			}
  			
  		},
  		error => {
  			console.log(error);
  		}
  		);
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
        response => {
            this.getProfile();
            
            
          
        },
        error => {
          console.log(error);
        }
      );
  }
}