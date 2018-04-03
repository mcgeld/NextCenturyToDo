import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { todosReducer, todoIdReducer, editingReducer } from './todos';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({todos: todosReducer,
                         nextTodoId: todoIdReducer,
                         editing: editingReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
