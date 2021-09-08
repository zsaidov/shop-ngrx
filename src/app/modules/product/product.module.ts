import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';
import {InsertComponent} from './insert/insert.component';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '**',
        component: ProductComponent
    }
];

@NgModule({
    declarations: [ProductComponent, InsertComponent],
    exports: [ProductComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule.forChild(routes),
    ]
})
export class ProductModule {
}
