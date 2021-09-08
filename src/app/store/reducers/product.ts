import {createReducer, MetaReducer, on} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {IProduct} from 'interfaces/product';
import {ProductActions} from '../actions/products';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface IProductState extends EntityState<IProduct> {
    products: IProduct[];
    selectedProduct?: IProduct;
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>();

export const initialState = adapter.getInitialState({
    products: [],
    selectedProduct: null,
});

export const productReducer = createReducer(
    initialState,
    on(ProductActions.productsLoaded, (state, action) => {
        console.log(state, action.products);
        return adapter.setAll(action.products, state);
    }),
    on(ProductActions.createProduct, (state, {product}) => {
        console.log(state, product);
        return adapter.addOne(product, state);
    }),
    on(ProductActions.editProduct, (state, {update}) => {
        console.log(state, update);
        return adapter.updateOne(update, state);
    }),
    on(ProductActions.deleteProduct, (state, {id}) => {
        console.log(state, id);
        return adapter.removeOne(id, state);
    }),
    on(ProductActions.selectedProduct, (state, {product}) => ({
        ...state,
        selectedProduct: product,
    }))
);
const {
    selectAll
} = adapter.getSelectors();

// select the array of products
export const selectAllProducts = selectAll;

export interface MainState {
    product: IProductState;
}

export const metaReducers: MetaReducer<MainState>[] = !environment.production ? [] : [];
