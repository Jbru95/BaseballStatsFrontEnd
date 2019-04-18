import { Component, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { PlayerService } from '../Services/PlayerService';

@Component({
    selector: 'Player-Add-Modify',
    templateUrl: '../templates/PlayerAddModifyComponent.html'
})

export class AddModifyPlayerComponent implements OnChanges{

    @Input() playerDetails: any;
    @Output() close = new EventEmitter<string>();
    @Output() cmdRes = new EventEmitter<number>();
    addModPlayerForm: FormGroup;
    mode: string;
    modifyInfo: any;


    constructor(private playerService: PlayerService, private snackbar: MatSnackBar, private fb: FormBuilder){
        this.mode = "Add";
        this.createForm();
    }
    
    ngOnChanges(changes: { [property: string]: SimpleChange}) {
        if (changes['details'].currentValue != undefined) {
            const newDetails = changes['details'].currentValue;
            if(this.mode != newDetails.mode){
                this.addModPlayerForm.reset();
                this.addModPlayerForm.controls['playerName'].markAsPristine();
                this.addModPlayerForm.controls['playerName'].markAsUntouched();
                this.addModPlayerForm.markAsPristine();
                this.addModPlayerForm.markAsUntouched();
                this.addModPlayerForm.controls['WAR'].setValue(0.0)
                this.addModPlayerForm.controls['Average'].setValue(0.0)
                this.addModPlayerForm.controls['Hits'].setValue(0)
                this.addModPlayerForm.controls['Homeruns'].setValue(0)
                this.addModPlayerForm.controls['OBP'].setValue(0.0)
                this.addModPlayerForm.controls['Slug'].setValue(0.0)
                this.addModPlayerForm.controls['OPS'].setValue(0.0)
            }
            this.mode = newDetails.mode;
            if ( newDetails.selectedRow != null){
                this.importFormDetails(newDetails.selectedRow);
                this.modifyInfo = newDetails.selectedRow;
            }
        }
    }

    /**
     * createForm
     * Initializes the FormGroup for this component
     */
    createForm(): void {
        this.addModPlayerForm = this.fb.group({
            playerName: ['', Validators.required],
            playerDescription: [''],
            Number: [''],
            Position: [''],
            WAR: [0.0],
            Average: [0.0],
            Hits: [0],
            Homeruns: [0],
            OBP: [0.0],
            Slug: [0.0],
            OPS: [0.0],
        });
    }

    /**
     * importFormDetails
     * Takes the current properties for a modify object and puts them into the form
     * @param details
     */
    importFormDetails(details: any): void{
        this.addModPlayerForm.controls['playerName'].setValue(details.playerName);
        this.addModPlayerForm.controls['playerDescription'].setValue(details.playerDescription)
        this.addModPlayerForm.controls['Number'].setValue(details.Numer)
        this.addModPlayerForm.controls['Position'].setValue(details.Position)
        this.addModPlayerForm.controls['WAR'].setValue(details.WAR)
        this.addModPlayerForm.controls['Average'].setValue(details.Average)
        this.addModPlayerForm.controls['Hits'].setValue(details.hits)
        this.addModPlayerForm.controls['Homeruns'].setValue(details.Homeruns)
        this.addModPlayerForm.controls['OBP'].setValue(details.OBP)
        this.addModPlayerForm.controls['Slug'].setValue(details.Slug)
        this.addModPlayerForm.controls['OPS'].setValue(details.OPS)
    }

    /**
     * submitPlayer
     * Sends the new Player data to the back-end API to add to/mod the database
     */
    submitPlayer(): void {
        const data = {
            ID: (this.mode == "Add") ? 0 : this.playerDetails.selectedRow.ID,
            PlayerName: this.addModPlayerForm.controls['playerName'].value,
            playerDescription: this.addModPlayerForm.controls['playerDescription'].value,
            Number: this.addModPlayerForm.controls['Number'].value,
            Position: this.addModPlayerForm.controls['Position'].value,
            WAR: this.addModPlayerForm.controls['WAR'].value,
            Average: this.addModPlayerForm.controls['Average'].value,
            Hits: this.addModPlayerForm.controls['Hits'].value,
            HomeRuns: this.addModPlayerForm.controls['Homeruns'].value,
            Walks: this.addModPlayerForm.controls['Walks'].value,
            OBP: this.addModPlayerForm.controls['OBP'].value,
            Slug: this.addModPlayerForm.controls['Slug'].value,
            OPS: this.addModPlayerForm.controls['OPS'].value
        }

        this.closeModal();
        this.sendData(data)
    }

    sendData(data: any):void {
        if( this.mode == "Add"){ //if mode is add, add the player via post
            this.playerService.addPlayerViaPost(data).subscribe(
                res => {
                    if ( res.status == 200) {
                        const resString = data.PlayerName + 'has been created.';
                        this.snackbar.open(resString, null, {duration : 2000});
                        this.resetForm();
                        this.mode = "Add";
                    }
                },
                error => {
                    console.log(error);
                    this.snackbar.open(error, null, {duration: 2000});
                }
            )
        }

        else { //if mode is not add, it is modify, modify the player via PUT
            this.playerService.modifyPlayerViaPut(data).subscribe(
                res => {
                    if ( res.status == 200) {
                        this.snackbar.open( data.PlayerName + 'has been created.', null, {duration : 2000});
                        this.resetForm();
                        this.mode = "Add";
                    }
                },
                error => {
                    console.log(error);
                    this.snackbar.open(error, null, {duration: 2000});
                }
            )
        }
    }

    closeModal(): void {
        this.close.emit('#addModifyPlayerModal');
        this.resetForm();
    }

    resetForm(): void {
        this.addModPlayerForm.reset();
        this.addModPlayerForm.markAsPristine();
        this.addModPlayerForm.markAsUntouched();
        this.addModPlayerForm.controls['WAR'].setValue(0.0)
        this.addModPlayerForm.controls['Average'].setValue(0.0)
        this.addModPlayerForm.controls['Hits'].setValue(0)
        this.addModPlayerForm.controls['Homeruns'].setValue(0)
        this.addModPlayerForm.controls['OBP'].setValue(0.0)
        this.addModPlayerForm.controls['Slug'].setValue(0.0)
        this.addModPlayerForm.controls['OPS'].setValue(0.0)
    }

    /**
     * onReset
     * Click listener for resetting the form
     */
    onReset(): void {
        this.resetForm();
        if ( this.mode == "Modify"){
            this.importFormDetails(this.modifyInfo);
        }
    }
}