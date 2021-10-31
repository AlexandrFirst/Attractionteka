import {IMediaFileDTO} from "../admin/IMediaFileDTO";
import {IMediaResponse} from "../admin/IMediaResponse";


export interface IPlaceResponse {
    id: number;
    content: string;
    name: string;
    shortDescription: string;
    listKeyWords: idValueKeyWords;
    uploadTime: Date;
    photos: IMediaResponse[];
    videos: IMediaResponse[];
    audios: IMediaResponse[];

    // public int Id { get; set; }
    // public string Content { get; set; }
    // public string Name { get; set; }
    // public string ShortDescription { get; set; }
    // public List<string> ListKeyWords { get; set; }
    // public DateTime UploadTime { get; set; }
    // public HashSet<MediaFileDto> Photos { get; set; }
    // public HashSet<MediaFileDto> Videos { get; set; }
    // public HashSet<MediaFileDto> Audios { get; set; }
}


export interface idValueKeyWords {
    $id: number;
    $values: string[];
}

export interface idValueMedia {
    $id: number;
    $values: IMediaResponse[];
}


