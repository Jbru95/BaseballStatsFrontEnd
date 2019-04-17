import { Component, OnDestroy } from "@angular/core";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { PlayerService } from '../Services/PlayerService';
import { Player, IPlayer } from '../Models/Player';

declare var $: any;

@Component({
    selector: "MainComponent",
    templateUrl: "../Templates/PlayerComponent.html"
})

export class PlayerComponent implements OnDestroy{
    
    refreshTimer: any;
    playerList = new Array<Player>();
    refreshRate = 5000;
    selectedRow: Player;

    constructor(private snackbar: MatSnackBar, private playerService: PlayerService){

        this.getAllPlayers();
        this.refreshTimer = setInterval(() => {
            this.getAllPlayers();
        }, this.refreshRate);
    }

    ngOnDestroy() {
        clearInterval(this.refreshTimer);
        if ( $('#addModifyPlayerModal').hasClass('in')){
            $('#addModifyPlayerModal').modal('hide');
        }
        if ( $('#deletePlayerModal').hasClass('in')){
            $('#deletePlayerModal').modal('hide');
        }
        
    }

    getAllPlayers(): void {
        this.playerService.getAllPlayers().subscribe(
            res => {
                if (res.status == 200) {
                    const data: IPlayer[] = res.body;
                    this.playerList = [];
                    for (const player of data){
                        this.playerList.push(new Player(player));
                    }
                }
            },
            error => {
                this.snackbar.open("Unable to get players data", null, {duration: 2000});
            }
        )
    }

    //rowSelected(){} //maybe??

    /**
     * modalClosed
     * Event listener to close an active modal
     * @param event Name of modal
     */
    modalClosed(event: any): void {
        $(event).modal('hide');
        this.selectedRow = null;
    }

    /**
     * onCmdRed
     * Event listener for when a command sends back a response to a modal
     * @param event Response code
     */
    onCmdRes(event: number): void {
        this.getAllPlayers();
    }
}