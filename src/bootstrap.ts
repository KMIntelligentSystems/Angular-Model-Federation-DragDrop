import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  /*If you are using static imports anywhere in your project, you will need to set up an asynchronous boundary 
  in order for Module Federation to work correctly. You can do this by setting up a file called bootstrap.js 
  and dynamically importing the main .js file of your application.*/
