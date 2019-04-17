import { Component, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Player } from '../Models/Player';

@Component({
    selector :'Delete-Player',
    templateUrl: '../templates/PlayerDeleteComponent.html'
})

export class DeletePlayerComponent{

    @Input() playerDetails: Player;
    @Output() close = new EventEmitter<string>();
    @Output() cmdRes = new EventEmitter<number>();

    constructor(){

    }
}