// src/components/Pagination/usePagination.ts
import { useMemo } from "react";

// src/components/Pagination/pagination.utils.ts
var DOTS = "...";

// src/components/Pagination/usePagination.ts
function usePagination({
  total,
  pageSize,
  currentPage,
  siblingCount
}) {
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
    const range = [];
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

// src/components/Pagination/Pagination.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Pagination({
  total,
  pageSize,
  currentPage,
  onChange,
  siblingCount = 1
}) {
  const totalPages = Math.ceil(total / pageSize);
  const paginationRange = usePagination({
    total,
    pageSize,
    currentPage,
    siblingCount
  });
  if (totalPages <= 1) return null;
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onChange(page);
  };
  const handleKeyDown = (e, page) => {
    if (page === DOTS) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToPage(Number(page));
    }
  };
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Pagination", children: /* @__PURE__ */ jsxs("ul", { className: "pagination", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => goToPage(currentPage - 1),
        disabled: currentPage === 1,
        children: "Prev"
      }
    ) }),
    paginationRange.map((page, idx) => {
      if (page === DOTS) {
        return /* @__PURE__ */ jsx("li", { className: "dots", children: "..." }, `dots-${idx}`);
      }
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "button",
        {
          className: currentPage === page ? "active" : "",
          onClick: () => goToPage(Number(page)),
          onKeyDown: (e) => handleKeyDown(e, page),
          "aria-current": currentPage === page ? "page" : void 0,
          "aria-label": `Go to page ${page}`,
          children: page
        }
      ) }, page);
    }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => goToPage(currentPage + 1),
        disabled: currentPage === totalPages,
        children: "Next"
      }
    ) })
  ] }) });
}
export {
  Pagination
};
//# sourceMappingURL=index.mjs.map