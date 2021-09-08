import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ProductService} from '../../modules/product/product.service';
import {of} from 'rxjs';
import {
    createProduct,
    deleteProduct,
    editProduct,
    errorProducts,
    loadedErrorProducts,
    loadProducts,
    productsLoaded
} from '../actions/products';

@Injectable()
export class ProductEffects {

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(loadProducts),
        mergeMap(() => this.service.getProducts()
            .pipe(
                map((products) => {
                    this.service.spinner = false;
                    return productsLoaded({products});
                }),
                catchError(() => of(loadedErrorProducts))
            ))
        ),
    );


    editProducts$ = createEffect(() => this.actions$.pipe(
        ofType(editProduct),
        mergeMap((res) => this.service.editProduct(res.update.changes)
            .pipe(
                catchError(() => of(errorProducts))
            ))
        ),
        {dispatch: false}
    );

    deleteProducts$ = createEffect(() => this.actions$.pipe(
        ofType(deleteProduct),
        mergeMap((res) => this.service.deleteProduct(res.id)
            .pipe(
                catchError(() => of(errorProducts))
            ))
        ),
        {dispatch: false}
    );

    createProduct$ = createEffect(() => this.actions$.pipe(
        ofType(createProduct),
        mergeMap((res) => this.service.addProduct(res.product)
            .pipe(catchError(() => of(errorProducts))))
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions,
                private service: ProductService) {
    }
}
