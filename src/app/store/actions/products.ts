import {createAction, props} from '@ngrx/store';
import {IProduct} from 'interfaces/product';
import {Update} from '@ngrx/entity';

export const loadProducts = createAction(
    '[PRODUCT] Load Products',
);
export const loadedErrorProducts = createAction(
    '[PRODUCT] Products Loaded Error',
);
export const errorProducts = createAction(
    '[PRODUCT] Error',
);
export const productsLoaded = createAction(
    '[PRODUCT] Products Loaded Success',
    props<{ products: IProduct[] }>()
);
export const createProduct = createAction(
    '[PRODUCT] Create Product',
    props<{ product?: IProduct }>()
);
export const editProduct = createAction(
    '[PRODUCT] Edit Product',
    props<{ update: Update<IProduct> }>()
);
export const deleteProduct = createAction(
    '[PRODUCT] Delete Product',
    props<{ id: number }>()
);
export const selectedProduct = createAction(
    '[PRODUCT] Select Product',
    props<{ product?: IProduct }>()
);

export const ProductActions = {
    loadProducts,
    productsLoaded,
    createProduct,
    deleteProduct,
    editProduct,
    selectedProduct,
    errorProducts,
    loadedErrorProducts
};
