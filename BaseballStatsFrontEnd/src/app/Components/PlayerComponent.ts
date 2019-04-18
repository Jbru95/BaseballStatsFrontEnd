import { Component, OnDestroy } from "@angular/core";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { PlayerService } from '../Services/PlayerService';
import { Player, IPlayer } from '../Models/Player';
import { GridDataResult, PageChangeEvent, SelectionEvent, RowArgs } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

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
    gridHeight: number;
    gridTotalItems: number;
    gridDataSource: Player[];
    gridView: GridDataResult;
    sort: SortDescriptor[] = [];
    public isRowSelected = (e: RowArgs) => {
        return e.dataItem.ID == (this.selectedRow != undefined ? this.selectedRow.ID : null);
    }

    constructor(private snackbar: MatSnackBar, private playerService: PlayerService){

        this.gridHeight = (window.innerHeight - 300);
        
        this.getAllPlayers();
        // this.refreshTimer = setInterval(() => {
        //     this.getAllPlayers();
        // }, this.refreshRate);
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
                // if (res.status == 200) {
                    // const data: any = res.body;
                    const data: any = res;
                    this.gridDataSource = [];
                    for (const player of data){
                        this.gridDataSource.push(new Player(player));
                    }
                    this.gridTotalItems = this.gridDataSource.length;
                    this.loadItems();
                // }
            },
            error => {
                this.snackbar.open("Unable to get players data", null, {duration: 2000});
            }
        )
    }

    private loadItems(): void {
        this.gridView = {
            data: orderBy(this.gridDataSource, this.sort),
            total: this.gridTotalItems
        };
    }

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

    /**
     * rowSelected
     * Event Listener for Kendo Grid when a row is selected
     * @param event
     */
    rowSelected(event: SelectionEvent): void {
        if (event.selectedRows.length != 0)
            this.selectedRow = event.selectedRows[0].dataItem;
        else
            this.selectedRow = null;
    }

    // addPlayer(){ old test functions
    //     const data = {
    //         // ID: ,
    //         PlayerName: "posttest",
    //         playerDescription: "postdesc",
    //         Number: "testnumber",
    //         Position: "testpos",
    //         WAR: 0.0,
    //         Average: 0.0,
    //         Hits: 0,
    //         HomeRuns: 0,
    //         Walks: 0,
    //         OBP: 0.0,
    //         Slug: 0.0,
    //         OPS: 0.0
    //     }
    //     this.playerService.addPlayerViaPost(data).subscribe(
    //         res => {
    //             if ( res.status == 200) {
    //                 const resString = data.PlayerName + 'has been created.';
    //                 this.snackbar.open(resString, null, {duration : 2000});
    //             }
    //         },
    //         error => {
    //             console.log(error);
    //             this.snackbar.open(error, null, {duration: 2000});
    //         }
    //     )
    // }

    // modPlayer(){ old test functions
    //     const data = {
    //         ID: 1003,
    //         PlayerName: "posttest",
    //         playerDescription: "postdesc",
    //         Number: "testnumber",
    //         Position: "testpos",
    //         WAR: 0.0,
    //         Average: 0.0,
    //         Hits: 0,
    //         HomeRuns: 0,
    //         Walks: 0,
    //         OBP: 0.0,
    //         Slug: 0.0,
    //         OPS: 0.0
    //     };
    //     this.playerService.modifyPlayerViaPut(data).subscribe(
    //         res => {
    //             console.log(res);
    //             if ( res.status == 200) {
    //                 this.snackbar.open( data.PlayerName + 'has been created.', null, {duration : 2000});
    //                 // this.resetForm();
    //                 // this.mode = "Add";
    //             }
    //         },
    //         error => {
    //             console.log(error);
    //             this.snackbar.open(error, null, {duration: 2000});
    //         }
    //     )
    // }
}