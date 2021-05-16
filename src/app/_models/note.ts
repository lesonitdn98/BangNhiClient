import { User } from '@app/_models'

export class Note {
    id!: number;
    user!: User;
    title!: string;
    description!: string;
    date!: string;
}