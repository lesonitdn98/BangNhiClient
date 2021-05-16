import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Note } from '@app/_models';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { NoteService } from '@app/_services';
import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'note.component.html' })
export class NoteComponent {
    loading = false;
    notes!: Note[];
    user!: User;
    users!: User[];
    currentNote!: Note;

    constructor(
        private noteService: NoteService,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe((x: User) => this.user = x);
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.getAllNotes();
    }

    getAllNotes() {
        this.noteService.getAll().pipe(first()).subscribe(notes => {
            this.loading = false;
            this.notes = notes.slice().reverse();
            this.currentNote = this.notes[0];
        });
    }

    setCurrentNote(note: Note) {
        this.currentNote = note
    }

    addNewNote() {
        if (!this.loading) {
            this.loading = true;
            this.noteService.newNote("New Note", "").pipe(first()).subscribe(data => {
                this.getAllNotes();
            })
        }
    }

    removeNote() {
        if (!this.loading) {
            this.loading = true;
            this.noteService.removeNote(this.currentNote).pipe(first()).subscribe(data => {
                this.getAllNotes();
            })
        }
    }
}