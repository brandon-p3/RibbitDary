import { Component } from '@angular/core';
import { GoogleCalendarService } from '../services/google-calendar.service';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.css']
})
export class EventCreatorComponent {
  event = {
    summary: 'Ejemplo de Evento',
    location: 'Ubicación del Evento',
    description: 'Descripción del evento',
    start: {
      dateTime: '',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '',
      timeZone: 'America/Los_Angeles'
    },
    attendees: [{ email: 'ejemplo@correo.com' }],
  };

  constructor(private googleCalendarService: GoogleCalendarService) {}

  async createEvent() {
    // Convertir fechas de datetime-local a formato ISO con zona horaria
    this.event.start.dateTime = this.convertToISOWithTimezone(this.event.start.dateTime);
    this.event.end.dateTime = this.convertToISOWithTimezone(this.event.end.dateTime);

    try {
      const response = await this.googleCalendarService.addEvent(this.event);
      console.log('Evento creado exitosamente:', response);
      alert('Evento creado exitosamente');
    } catch (error) {
      console.error('Error al crear el evento:', error);
      alert('Error al crear el evento: ' + error);
    }
  }

  // Función para convertir a ISO con zona horaria
  convertToISOWithTimezone(dateTime: string): string {
    const date = new Date(dateTime);
    const timezoneOffset = -7 * 60; // Offset en minutos (cambia a tu zona horaria)
    date.setMinutes(date.getMinutes() + timezoneOffset);
    return date.toISOString().slice(0, -1) + '-07:00';
  }
}
