import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const appRoutes: Routes = [
    {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
      /*  resolve: {
           products: ProductResolver
       }*/
    },
    {
        path: 'error-404',
        loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule),
    },
    {
        path: '**',
        redirectTo: 'product'
    }
];

export function onRouterError(err: any): boolean {
    console.log(err);
    return false;
}

export const routerConfig = {
    useHash: true,
    errorHandler: onRouterError
};

export const APP_ROUTES: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, routerConfig);
