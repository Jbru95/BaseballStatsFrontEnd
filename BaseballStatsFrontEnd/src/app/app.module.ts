import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './Components/PlayerComponent';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddModifyPlayerComponent } from './Components/PlayerAddModifyComponent';
import { DeletePlayerComponent } from './Components/PlayerDeleteComponent';
import { PlayerService } from './Services/PlayerService';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    AddModifyPlayerComponent,
    DeletePlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [PlayerService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
