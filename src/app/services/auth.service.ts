import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: any = {
        firstName: 'Test',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFobWFkIEhhbGltb3YiLCJpYXQiOjE1MTYyMzkwMjJ9.6oPxDhtc4HW8upoeqnO5CJLP0ofo7eeg_jShmq57SeU',
        avatar: 'assets/image/profile.png'
    };

    constructor() {
    }
}
