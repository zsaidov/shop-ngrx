import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {IProduct} from 'interfaces/product';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {getProducts} from 'store/selectors/product';
import {MainState} from 'store/reducers/product';
import {loadProducts, ProductActions} from 'store/actions/products';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
    showPopup = false;
    selectedProduct: IProduct;
    showConfirm = false;
    products$: Observable<IProduct[]>;

    private initSub: Subscription;

    constructor(public service: ProductService,
                private store: Store<MainState>) {
    }

    ngOnInit(): void {
        this.store.dispatch(loadProducts());
        this.products$ = this.store.select(getProducts);
        this.products$.pipe(tap(res => console.log(res)));
    }

    ngOnDestroy(): void {
        if (this.initSub && !this.initSub.closed) {
            this.initSub.unsubscribe();
        }
    }

    onDeleteClick(product: IProduct): void {
        this.showConfirm = true;
        this.selectedProduct = product;
    }

    onEditClick(product: IProduct): void {
        this.showPopup = true;
        this.store.dispatch(ProductActions.selectedProduct({product}));
    }

    onInsertClick(): void {
        this.showPopup = true;
    }

    onValueChange(evt: { type: string, data?: any }): void {
        if (evt.type === 'close') {
        } else if (evt.type === 'editProduct') {
        } else if (evt.type === 'newProduct') {
        }
        this.selectedProduct = null;
        this.showPopup = false;
    }

    onConfirmChange(evt: string): void {
        if (evt === 'Yes') {
            this.store.dispatch(ProductActions.deleteProduct({id: this.selectedProduct.id}));
            this.selectedProduct = null;
        }
        this.showConfirm = false;
    }
}
