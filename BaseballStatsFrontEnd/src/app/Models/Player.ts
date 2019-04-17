interface IPlayer{
    ID: number;
    PlayerName: string;
    PlayerDescription: string;
    Number: string;
    Position: string;
    WAR: number;
    Average: number;
    Hits: number;
    HomeRuns: number;
    Walks: number;
    OBP: number;
    Slug: number;
    OPS: number;
}

export class Player{

    ID: number;
    PlayerName: string;
    PlayerDescription: string;
    Number: string;
    Position: string;
    WAR: number;
    Average: number;
    Hits: number;
    Walks: number;
    OBP: number;
    Slug: number;
    OPS: number;

    constructor(player: IPlayer){
        this.ID = player.ID;
        this.PlayerName = player.PlayerName;
        this.PlayerDescription = player.PlayerDescription;
        this.Number = player.Number;
        this.Position = player.Position;
        this.WAR = player.WAR;
        this.Average = player.Average;
        this.Hits = player.Hits;
        this.Walks = player.Walks;
        this.OBP = player.OBP;
        this.Slug = player.Slug;
        this.OPS = player.OPS;
    }
}