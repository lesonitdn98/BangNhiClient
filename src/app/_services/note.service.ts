import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { Note } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class NoteService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/notes`)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }));
    }

    newNote(title: string, description: string) {
        return this.http.post<any>(`${environment.apiUrl}/notes/add?title=${title}&description=${description}`, null)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }));
    }

    removeNote(note: Note) {
        return this.http.post<any>(`${environment.apiUrl}/notes/remove?noteId=${note.id}`, null)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }));
    }
}