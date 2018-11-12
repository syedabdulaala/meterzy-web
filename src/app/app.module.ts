import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { MatNativeDateModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { SimpleLayoutComponent } from './shared/layout/simple-layout/simple-layout.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthComponent } from './pages/auth/auth.component';
import { TariffsComponent } from './pages/tariffs/tariffs.component';
import { MetersComponent } from './pages/meters/meters.component';
import { ReadingsComponent } from './pages/readings/readings.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tariffs',
        component: TariffsComponent
      },
      {
        path: 'meters',
        component: MetersComponent
      },
      {
        path: 'readings',
        component: ReadingsComponent
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AppComponent,
    SimpleLayoutComponent,
    MainLayoutComponent,
    ConfirmDialogComponent,
    AuthComponent,
    TariffsComponent,
    MetersComponent,
    ReadingsComponent,
    LoaderComponent,
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
