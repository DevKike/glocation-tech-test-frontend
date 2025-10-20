import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none',
        },
      },
      ripple: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
