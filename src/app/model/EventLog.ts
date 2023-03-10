import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EventLog {
    
    eventId: number = 0;
    currentTimestamp: string = '';
    activityTimeStamp: string = '';
    activity: string = '';

    constructor() {

    }
}