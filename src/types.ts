export type Pin = {
    id: string;
    link: string;
    note: string;
    image: {
        original: {
            url: string;
            width: number;
            height: number;
        };
    };
};
