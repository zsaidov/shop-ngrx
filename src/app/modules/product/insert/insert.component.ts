import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IProduct} from 'interfaces/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectedProductSel} from 'store/selectors/product';
import {Update} from '@ngrx/entity';
import {ProductActions, selectedProduct} from 'store/actions/products';

@Component({
    selector: 'insert-product',
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.scss'],
})
export class InsertComponent implements OnInit, OnDestroy {
    @Output() valueChange = new EventEmitter<{ type: string, data?: any }>();
    @Input() product: IProduct;
    productForm: FormGroup;

    private initSub: Subscription;

    constructor(private fb: FormBuilder,
                private service: ProductService,
                private store: Store) {
    }

    ngOnInit(): void {
        this.initSub = this.store.select(selectedProductSel)
            .subscribe(res => {
                if (res) {
                    this.product = res;
                }
                this.createFormGroup();
            });
    }

    ngOnDestroy(): void {
        this.store.dispatch(selectedProduct({}));
        if (this.initSub && !this.initSub.closed) {
            this.initSub.unsubscribe();
        }
        this.product = null;
        this.initSub = null;
        this.productForm = null;
        this.valueChange = null;
    }

    onSaveClick(): void {
        const product: IProduct = {
            name: this.productForm.value.name,
            description: this.productForm.value.description,
            price: this.productForm.value.price,
            unit: this.productForm.value.unit,
            createAt: Date.now(),
            updateAt: Date.now()
        };
        if (this.product) {
            product.id = this.product.id;
            product.updateAt = Date.now();
            const update: Update<IProduct> = {
                id: this.product.id,
                changes: {
                    ...this.product,
                    ...product
                }
            };
            this.store.dispatch(ProductActions.editProduct({update}));
            this.valueChange.emit({type: 'editProduct', data: product});
        } else {
            this.store.dispatch(ProductActions.createProduct({product}));
            this.valueChange.emit({type: 'newProduct', data: product});
        }
    }

    onCloseClick(): void {
        this.valueChange.emit({type: 'close'});
    }

    private createFormGroup(): void {
        this.productForm = this.fb.group({
            name: [this.product?.name, [Validators.required, Validators.minLength(3)]],
            description: [this.product?.description, [Validators.required, Validators.minLength(10)]],
            price: [this.product?.price, [Validators.required, Validators.pattern(/\-?\d+(\.\d*)?/gm)]],
            unit: [this.product?.unit || 'кг', [Validators.required]],
        });
    }
}
