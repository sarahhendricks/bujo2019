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
export type BoardPinsResponse = {
    data: Array<Pin>;
    hasNext?: boolean;
    page?: {
        cursor: string;
        next: string;
    };
    next: () => BoardPinsResponse;
};
