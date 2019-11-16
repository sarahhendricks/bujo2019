export type Pin = {
    url: string;
    id: string;
    link: string;
    description: string;
};
export type BoardPinsResponse = {
    data: Array<Pin>;
};
