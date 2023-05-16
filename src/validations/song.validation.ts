import ISong from '@/constraints/interfaces/ISong';

import Genre from '@/constraints/enums/IGenre';
import {
    IsDateString,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

interface TypeProps
    extends Omit<ISong, '_id' | 'createdAt' | 'updatedAt' | 'pathRef'> {}

export default class SongValidationDecorator implements TypeProps {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    album: string;

    @IsNotEmpty()
    @IsString()
    artist: string;

    @IsNotEmpty()
    @IsIn([
        Genre.BALLAD,
        Genre.BOLERO,
        Genre.CLASSICAL,
        Genre.ELECTRONIC,
        Genre.HIP_HOP,
        Genre.POP,
        Genre.R_AND_B,
        Genre.Rock,
        Genre.DANCE,
    ])
    genre: Genre;

    @IsDateString()
    publish: string;

    @IsNotEmpty()
    @IsString()
    thumbnailPath: string;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    @IsString()
    albumArtist: string;

    constructor(payload: TypeProps) {
        this.title = payload.title;
        this.album = payload.album;
        this.artist = payload.artist;
        this.genre = payload.genre;
        this.publish = payload.publish;
        this.thumbnailPath = payload.thumbnailPath;
        this.duration = payload.duration;
        this.albumArtist = payload.albumArtist;
    }
}
