import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmComponent} from './confirm/confirm.component';

@NgModule({
    declarations: [ConfirmComponent],
    exports: [ConfirmComponent],
    imports: [
        CommonModule
    ]
})
export class ComponentsModule {
}
