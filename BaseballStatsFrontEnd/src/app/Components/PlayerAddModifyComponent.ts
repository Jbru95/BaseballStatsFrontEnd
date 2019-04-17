import { Component, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
    selector: 'Player-Add-Modify',
    templateUrl: '../templates/PlayerAddModifyComponent.html'
})

export class AddModifyPlayerComponent implements OnChanges{

    constructor(){

    }
    
    ngOnChanges(){
        
    }
}