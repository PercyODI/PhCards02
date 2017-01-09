import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudyCardComponent } from './study-card/study-card.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';

// Set the routes for this app
const appRoutes: Routes = [
  {path: 'studycard/:deck', component: StudyCardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudyCardComponent,
    EditDeckComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
