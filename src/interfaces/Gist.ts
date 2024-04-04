export interface IGist {
    id: string;
    owner: { login: string; avatar_url?: string };
    description?: string;
    url: string;
    created_at: string;
    createdAtDate: string;
    createdAtTime: string;
    keywords: string;
    notebook: string;
    files: {
      [filename:string]: string,
       language: string,
       raw_url: string
      };
}

export interface IGistProps {
    gists: IGist[];
}

export interface IGistContextProps {
    gists: IGist[]; 
    setGists: (gists: IGist[]) => void;
}