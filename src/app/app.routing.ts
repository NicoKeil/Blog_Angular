//Import necesarios
import { ModuleWithProviders } from  '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostdetailComponent } from './components/postdetail/postdetail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IdentityGuard } from './services/identity-guard';



//Definir las rutas
const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'inicio', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard] },
	{path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuard] },
	{path: 'crear-entrada', component: PostNewComponent, canActivate: [IdentityGuard]  },
	{path: 'entrada/:id', component: PostdetailComponent },
	{path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuard] },
	{path: 'categoria/:id', component: CategoryDetailComponent },
	{path: 'perfil/:id', component: ProfileComponent, canActivate: [IdentityGuard] },
	{path: 'error', component: ErrorComponent},
	{path: '**', component: ErrorComponent}
];

//Exportar configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);