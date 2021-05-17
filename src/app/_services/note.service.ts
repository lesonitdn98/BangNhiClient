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

    getNotesByUser(userId: string) {
        return this.http.get<any>(`${environment.apiUrl}/notes/user?userId=${encodeURIComponent(userId)}`)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }));
    }

    newNote(title: string, description: string) {
        return this.http.post<any>(`${environment.apiUrl}/notes/add?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`, null)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }));
    }

    updateNote(note: Note, newTitle: string, newDescription: string) {
        return this.http.post<any>(`${environment.apiUrl}/notes/edit?noteId=${encodeURIComponent(note.id)}&title=${encodeURIComponent(newTitle)}&description=${encodeURIComponent(newDescription)}`, null)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }));
    }

    removeNote(note: Note) {
        return this.http.post<any>(`${environment.apiUrl}/notes/remove?noteId=${encodeURIComponent(note.id)}`, null)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }
        ));
    }

    searchNote(keyword: string) {
        return this.http.get<any>(`${environment.apiUrl}/notes/search?keyword=${encodeURIComponent(keyword)}`)
            .pipe(map(response => {
                if (response.ok) {
                    return response.data;
                }
            }
        ));
    }
}