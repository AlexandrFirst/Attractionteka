import {IMediaFileDTO} from "./IMediaFileDTO";
import {IMediaResponse} from "./IMediaResponse";


export interface IPlaceResponse {
    id: number;
    content: string;
    name: string;
    shortDescription: string;
    listKeyWords: idValueKeyWords;
    uploadTime: Date;
    photos: idValueMedia;
    videos: idValueMedia;
    audios: idValueMedia;

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
    $value: string[];
}

export interface idValueMedia {
    $id: number;
    $value: IMediaResponse[];
}


