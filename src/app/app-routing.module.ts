import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'post/post-create', pathMatch: 'full' },
  { path: 'post/post-create', component: PostCreateComponent },
  { path: 'post/post-list', component: PostListComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
