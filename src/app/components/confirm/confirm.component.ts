import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

@Component({
    selector: 'confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnDestroy {
    @Input() title = '';
    @Output() valueChange = new EventEmitter<string>();

    onYesClick(): void {
        this.valueChange.emit('Yes');
    }

    onNoClick(): void {
        this.valueChange.emit('No');
    }

    ngOnDestroy(): void {
        this.valueChange = null;
    }

}
