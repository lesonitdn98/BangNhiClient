import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Note } from '@app/_models';
import { NoteService } from '@app/_services';

@Component({ templateUrl: 'note.component.html' })
export class NoteComponent {
    loading = false;
    notes!: Note[];
    currentNote!: Note;

    constructor(private noteService: NoteService) { }

    ngOnInit() {
        this.loading = true;
        this.noteService.getAll().pipe(first()).subscribe(notes => {
            this.loading = false;
            this.notes = notes;
            this.currentNote = notes[0];
        });
    }

    setCurrentNote(note: Note) {
        this.currentNote = note
    }
}