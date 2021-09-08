import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IProductState, selectAllProducts} from '../reducers/product';

export const productFeatureSelector = createFeatureSelector<IProductState>('product');

export const getProducts = createSelector(
    productFeatureSelector,
    selectAllProducts
);

export const selectedProductSel = createSelector(
    productFeatureSelector,
    (selector) => selector.selectedProduct);
