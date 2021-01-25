import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.services';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
	public page_title: string;
	public status: string; 
	public identity;
	public token;
	public post: Post;
	public title;
	public categories;
	public url;
  public is_edit: boolean;

  public froala_options: Object = {
    charCounterCount: true,
    languages: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

	   public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'post/upload',
      method:"POST",
      headers: {
     "Authorization": this._userService.getToken()
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    attachPinText: 'Sube una foto para el post',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      attachPin: 'attachPin',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};
  constructor(
  		private _route: ActivatedRoute,
  		private _router: Router,
  		private _userService: UserService,
  		private _categoryService: CategoryService,
  		private _postService: PostService
  	) { 
  	this.page_title = 'Crear una Entrada';
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = global.url;
    

  }

  ngOnInit(): void {
  	this.getCategories();
  	this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
  	
  	//console.log(this.post);
  }

   getCategories(){
    this._categoryService.getCategories().subscribe(
      response =>{
        
         if(response.status == 'success'){
          this.categories = response.categories;
          
          
        }else{
          this.status = 'error';
        }

      },
      error => {
        console.log(error);
      }
      );
  }
  

  imageUpload(datos){
     let data = JSON.parse(datos.response);
     this.post.image = data.image;
  }




	onSubmit(form){
		this._postService.create(this.token, this.post).subscribe(
	        response => {
	          
	          if(response && response.status){
	          		this.post = response.post;
	                this.status = 'success';
	                
	                this._router.navigate(['inicio']);
	               
	                
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


