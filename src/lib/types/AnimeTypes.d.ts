export interface AnimeInfoProp {
  animeInfo: {
    info: {
      id: string;
      anilistId: number;
      malId: number;
      name: string;
      poster: string;
      description: string;
      stats: {
        rating: string;
        quality: string;
        episodes: {
          sub: number;
          dub: number | null;
        };
        type: string;
        duration: string;
      };

      promotionalVideos: {
        title: string;
        source: string;
        thumbnail: string;
      }[];
      charactersVoiceActors: {
        character: {
          id: string;
          poster: string;
          name: string;
          cast: string;
        };
        voiceActor: {
          id: string;
          poster: string;
          name: string;
          cast: string;
        };
      }[];
    };
    moreInfo: {
      japanese: string;
      synonyms: string;
      aired: string;
      premiered: string;
      duration: string;
      status: string;
      malscore: string;
      genres: string[];
      studios: string;
      producers: string[];
    };
  };

  mostPopularAnimes?: {
    id: string;
    name: string;
    jname: string;
    poster: string;
    episodes: {
      sub: number;
      dub: number| null;
    };
    type: string;
  }[];

  relatedAnimes?: {
    id: string;
    name: string;
    jname: string;
    poster: string;
    episodes: {
      sub: number;
      dub: number | null;
    };
    type: string;
  }[];

  recommendedAnimes?: {
    id: string;
    name: string;
    jname: string;
    poster: string;
    duration: string;
    type: string;
    rating: string | null;
    episodes: {
      sub: number;
      dub: number | null;
    };
  }[];
}



