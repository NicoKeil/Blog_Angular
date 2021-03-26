import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
	public page_title: string;
	public url;
	public status: string;
	public posts: Array<Post>;
	public identity;
	public token;
	public buscador: any;
	public images1;
	public images2;
	public images3;
	constructor(
		private _postService: PostService,
		private _userService: UserService
	) {
		this.page_title = 'Inicio';
		this.url = global.url
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getPosts();
	}
	getPosts() {
		this._postService.getPost().subscribe(
			response => {
				if (response.status == 'success') {
					this.posts = response.post;
					for (let i = 0; i < 3; i++) {
						this.images1 = this.posts[0].image;
						this.images2 = this.posts[0].image;
						this.images3 = this.posts[0].image;
					}
				}

			},
			error => {

			}
		);
	}

	deletePost(id) {
		this._postService.delete(this.token, id).subscribe(
			response => {
				this.getPosts();
			},
			error => {
				console.log(error);
			}
		);
	}
	buscar(operacion, type, dor, zona) {
		console.log(operacion, type, dor, zona);
	}
}
