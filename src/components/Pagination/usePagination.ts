import { useMemo } from "react";
import { DOTS } from "./pagination.utils";

interface Props {
  total: number;
  pageSize: number;
  currentPage: number;
  siblingCount: number;
}

export function usePagination({
  total,
  pageSize,
  currentPage,
  siblingCount,
}: Props) {
  return useMemo(() => {
    const totalPages = Math.ceil(total / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const range: (number | string)[] = [];

    range.push(1);

    if (showLeftDots) range.push(DOTS);

    for (let i = leftSibling; i <= rightSibling; i++) {
      range.push(i);
    }

    if (showRightDots) range.push(DOTS);

    range.push(totalPages);

    return range;
  }, [total, pageSize, currentPage, siblingCount]);
}