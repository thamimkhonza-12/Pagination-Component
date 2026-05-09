import React from "react";
import { usePagination } from "./usePagination";
import { PaginationProps } from "./pagination.types";
import { DOTS } from "./pagination.utils";
import "./pagination.css";

export default function Pagination({
  total,
  pageSize,
  currentPage,
  onChange,
  siblingCount = 1,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const paginationRange = usePagination({
    total,
    pageSize,
    currentPage,
    siblingCount,
  });

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onChange(page);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    page: number | string
  ) => {
    if (page === DOTS) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToPage(Number(page));
    }
  };

  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {paginationRange.map((page, idx) => {
          if (page === DOTS) {
            return (
              <li key={`dots-${idx}`} className="dots">
                ...
              </li>
            );
          }

          return (
            <li key={page}>
              <button
                className={currentPage === page ? "active" : ""}
                onClick={() => goToPage(Number(page))}
                onKeyDown={(e) => handleKeyDown(e, page)}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}