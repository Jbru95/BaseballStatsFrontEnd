import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { catchError, map, take } from "rxjs/operators";
import { throwError as observableThrowError, Observable, from} from 'rxjs';

@Injectable()
export class PlayerService{
    private endPointUrl: string = "localhost:64450/api/player/";
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
        return this.get(url);
    }

    /**
     * getPlayerById
     * @param Id gets a specific player from the back-end with the specified ID
     * @return Observable object which can be subscribed to in the component calling this service/method to access response
     */
    public getPlayerById(Id:number){
        const url = this.endPointUrl + Id.toString();
        return this.get(url);
    }

    /**
     * Get
     * Sends an HTTP GET request
     * @param url url to send the GET request to
     */
    private get(url: string){
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'})
        }
        return this.http.get(
            url, 
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