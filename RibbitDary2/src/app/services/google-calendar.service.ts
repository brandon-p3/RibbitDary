import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private clientId = '1051544364901-46c2kvf0fsca2r22l6h60h8s3rqof8vd.apps.googleusercontent.com';
  private discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  private scope = "https://www.googleapis.com/auth/calendar.events";

  constructor() {
    this.initializeGapi();
  }

  private initializeGapi() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: this.clientId,
        discoveryDocs: this.discoveryDocs,
        scope: this.scope
      }).then(() => {
        console.log('GAPI initialized successfully');
      }).catch((error: any) => {
        console.error('Error initializing GAPI', error);
      });
    });
  }

  async signIn() {
    try {
      const user = await gapi.auth2.getAuthInstance().signIn();
      console.log('User signed in:', user);
      return user;
    } catch (error) {
      console.error('Error signing in', error);
      throw error;
    }
  }

  async addEvent(event: any) {
    try {
      await this.signIn();
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      const response = await request.execute();
      console.log('Evento creado:', response);
      return response;
    } catch (error) {
      console.error('Error al crear el evento:', error);
      throw error;
    }
  }
}
