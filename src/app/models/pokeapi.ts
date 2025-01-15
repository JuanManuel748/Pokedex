export interface Data{
    count: number,
    next: string,
    previous: string,
    results: Result[]
}

export interface Result {
    name: string,
    url: string
}

export const exampleResult: Result = {
    name: 'aa',
    url: 'aa',
};