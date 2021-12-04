

export interface PlaceFilterDto {
    placeName?: string;
    keywords?: string[];
    authorNameList?: string[];
    fromTime?: Date;
    toTime?: Date;
    fromRating?: number;
    toRating?: number;
    sortByPopularity?: boolean;
    isDescending?: boolean;
}