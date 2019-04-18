import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { catchError, map, take } from "rxjs/operators";
import { throwError as observableThrowError, Observable, from} from 'rxjs';

@Injectable()
export class PlayerService{
    private endPointUrl: string = "http://localhost:64485/api/player";
    http: HttpClient = null;

    constructor(http: HttpClient){
        this.http = http;
    }

    /**
     * getAllPlayers
     * Calls api/player endpoint to recieve JSON Object containing all player rows from the back-end
     * @return Observable object which can be subscribed to in the component calling this service/method to access response
     */
    public getAllPlayers(){
        const url = this.endPointUrl;
        console.log(url);
        return this.get(url); 
    }

    /**
     * getPlayerById
     * gets a specific player from the back-end with the specified ID
     * @param Id ID of player to get
     * @return Observable object which can be subscribed to in the component calling this service/method to access response
     */
    public getPlayerById(Id:number){
        const url = this.endPointUrl + Id.toString();
        return this.get(url);
    }

    /**
     * addPlayerViaPost
     * Adds a player by calling the API with a json data object.
     * @param data json data object to POST to the endpoint
     */
    public addPlayerViaPost(data: any){
        const url = this.endPointUrl;
        return this.post(url, data);
    }

    /**
     * modifyPlayerViaPut
     * modifies a player object in the database by calling the backend API with an HTTP PUT command
     * @param data json data object to PUT to the endpoint
     */
    public modifyPlayerViaPut(data: any){
        const url = this.endPointUrl;
        return this.put(url, data);
    }

    /**
     * deletePlayerViaDelete
     * deletes a player object in the database by calling the backend API with a HTTP DELETE command
     * @param Id ID of the player to be deleted
     */
    public deletePlayerViaDelete(Id: number){
        const url = this.endPointUrl + Id.toString();
        return this.delete(url);
    }

    /**
     * Get
     * Sends an HTTP GET request
     * @param url url to send the GET request to
     */
    private get(url: string){
        // let options = {
        //     headers: new HttpHeaders({'Content-Type':'application/json'})
        // }
        return this.http.get(
            url, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
                // ,
                // observe: 'response'
            }).pipe(
                map(res => res),
                catchError(this.handleError)
            );
    }

    /**
     * Post
     * Sends an HTTP POST request
     * @param url url to send the POST request to 
     * @param data JSON object to POST to the endpoint
     */
    private post(url: string, data: any ){
        return this.http.post(
            url,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                observe: 'response'
            }).pipe(
                map(res => res),
                catchError(this.handleError)
            );
    }

    /**
     * Put
     * Sends an HTTP PUT request for updating data rows
     * @param url url to send the PUT request to 
     * @param data JSON object to PUT to the endpoint
     */
    private put(url: string, data: any){
        return this.http.put(
            url,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type':'application/json'
                },
                observe: 'response'
            }).pipe(
                map(res => res),
                catchError(this.handleError)
            );
    }

    /**
     * delete
     * Sends an HTTP Delete request for deleted a data row from the system
     * @param url url to send the delete request to, should be api/player/{ID}
     */
    private delete(url: string){
        return this.http.delete(
            url,
            {
                headers: {
                    'Content-Type':'application/json'
                },
                observe: 'response'
            }).pipe(
                map(res => res),
                catchError(this.handleError)
            );
    }

    /**
     * handleError
     * Handle any HTTP Response Errors
     * @param error
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Error occurred: ', error.error.message);
        }
        else {
            console.error(
                `API returned ${error.status},` +
                `body was: ${error.error}`
            );
        }
        return observableThrowError(error.error);
    }


}