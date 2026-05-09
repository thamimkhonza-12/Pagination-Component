export type PaginationProps = {
  total: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
  siblingCount?: number;
};