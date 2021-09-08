import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ProductEffects} from './effects/product';
import {metaReducers, productReducer} from './reducers/product';

@NgModule({
    imports: [
        StoreModule.forRoot({product: productReducer}, {metaReducers}),
        EffectsModule.forRoot([ProductEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        StoreRouterConnectingModule.forRoot()
    ],
    providers: [
        /*  {
              provide: RouterStateSerializer,
              useClass: CustomSerializer
          }*/
    ]
})

export class AppStoreModule {
}
