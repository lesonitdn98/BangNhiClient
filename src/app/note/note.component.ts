import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Note } from '@app/_models';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { NoteService } from '@app/_services';
import { AuthenticationService } from '../_services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({ templateUrl: 'note.component.html' })
export class NoteComponent {
    loading = false;
    notes!: Note[];
    user!: User;
    users!: User[];
    currentNote!: Note;
    currentTitle!: string;
    currentDescription!: string;
    selectedUser: string = '-1';

    constructor(
        private noteService: NoteService,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private modalService: NgbModal
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
            this.setCurrentNote(this.notes[0]);
        });
    }

    setCurrentNote(note: Note) {
        this.currentNote = note
        this.currentTitle = note.title
        this.currentDescription = note.description
    }

    addNewNote() {
        if (!this.loading) {
            this.loading = true;
            this.noteService.newNote("New Note", "").pipe(first()).subscribe(() => {
                this.getAllNotes();
                this.selectedUser = '-1';
            })
        }
    }

    removeNote() {
        if (!this.loading) {
            this.loading = true;
            this.noteService.removeNote(this.currentNote).pipe(first()).subscribe(() => {
                this.getAllNotes();
            })
        }
    }

    editTitle(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
            if (this.currentNote.title != this.currentTitle && this.currentTitle != '') {
                if (!this.loading) {
                    this.loading = true;
                    this.noteService.updateNote(this.currentNote, this.currentTitle, this.currentNote.description).pipe(first()).subscribe(() => {
                        this.currentNote.title = this.currentTitle
                        this.loading = false;
                    });
                }
            }
        }, () => {
            this.currentTitle = this.currentNote.title
        });
    }

    saveNote() {
        if (this.currentNote.description != this.currentDescription) {
            if (!this.loading) {
                this.loading = true;
                    this.noteService.updateNote(this.currentNote, this.currentNote.title, this.currentDescription).pipe(first()).subscribe(() => {
                        this.currentNote.description = this.currentDescription;
                        this.loading = false;
                    }
                );
            }
        }
    }

    onTitle(event: any) {
        this.currentTitle = event.target.value;
    }

    onDescription(event: any) {
        this.currentDescription = event.target.value;
    }

    callTypeUserId(id: string) {
        if (id === '-1') {
            this.getAllNotes();
        } else {
            this.loading = true;
            this.noteService.getNotesByUser(id).pipe(first()).subscribe(notes => {
                this.loading = false;
                this.notes = notes.slice().reverse();
                this.setCurrentNote(this.notes[0]);
                this.selectedUser = id;
            });
        }
    }

    onSearch(event: any) {
        this.loading = true;
        this.noteService.searchNote(event.target.value).pipe(first()).subscribe(notes => {
            this.selectedUser = '-1';
            this.loading = false;
            this.notes = notes.slice().reverse();
            this.setCurrentNote(this.notes[0]);
        });
    }
}