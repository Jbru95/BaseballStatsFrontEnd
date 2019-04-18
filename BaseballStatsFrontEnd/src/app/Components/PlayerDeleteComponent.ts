import { Component, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Player } from '../Models/Player';
import { PlayerService } from '../Services/PlayerService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector :'Delete-Player',
    templateUrl: '../templates/PlayerDeleteComponent.html'
})

export class DeletePlayerComponent{

    @Input() playerDetails: Player;
    @Output() close = new EventEmitter<string>();
    @Output() cmdRes = new EventEmitter<number>();

    constructor(private playerService: PlayerService, private snackbar: MatSnackBar){}

    /**
     * confirm 
     * function to send construct data object with id of player to be deleted, and then call sendData
     */
    confirm(): void {
        const data = {
            ID: this.playerDetails.ID
        }
        this.sendData(data);
    }

    /**
     * sendData
     * Sends data to endpoint via DELETE HTTP command using playerService
     * @param data json blod of with id of player to be deleted.
     */
    sendData(data: any): void{
        this.playerService.deletePlayerViaDelete(data).subscribe(
            res => {
                if (res.status == 200){
                    this.snackbar.open(this.playerDetails.PlayerName + ' has been delete.');
                    this.cmdRes.emit(200);
                }
            },
            error => {
                this.snackbar.open("Error - Unable to delete record");
                this.cmdRes.emit(404);
            }
        );
    }

    /**
     * closeModal
     * emits event to PlayerComponent to close the #deletePlayerModal
     */
    closeModal(): void {
        this.close.emit("#deletePlayerModal");
    }
}