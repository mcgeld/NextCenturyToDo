import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './todos';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({todos: todosReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
