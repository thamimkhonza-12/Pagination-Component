interface Props {
    total: number;
    pageSize: number;
    currentPage: number;
    siblingCount: number;
}
export declare function usePagination({ total, pageSize, currentPage, siblingCount, }: Props): (string | number)[];
export {};
