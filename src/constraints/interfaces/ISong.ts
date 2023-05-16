import { IGenre } from '@/constraints/enums/index.enum';
export default interface ISong {
    _id: string;
    title: string;
    albumArtist: string;
    artist: string;
    album: string;
    genre: IGenre;
    publish: string;
    pathRef: string;
    duration: number;
    thumbnailPath: string;
    createdAt?: Date;
    updatedAt?: Date;
}
