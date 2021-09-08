import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IProduct} from 'interfaces/product';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    spinner = true;

    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(`${environment.apiUrl}products`);
    }

    editProduct(data: Partial<IProduct>): Observable<IProduct> {
        return this.http.put<IProduct>(`${environment.apiUrl}products/${data.id}`, data);
    }

    deleteProduct(id: number): Observable<IProduct> {
        return this.http.delete<IProduct>(`${environment.apiUrl}products/${id}`);
    }

    addProduct(data: IProduct): Observable<IProduct> {
        return this.http.post<IProduct>(`${environment.apiUrl}products`, data);
    }
}
