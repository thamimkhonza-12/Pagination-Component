"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Pagination: () => Pagination
});
module.exports = __toCommonJS(index_exports);

// src/components/Pagination/usePagination.ts
var import_react = require("react");

// src/components/Pagination/pagination.utils.ts
var DOTS = "...";

// src/components/Pagination/usePagination.ts
function usePagination({
  total,
  pageSize,
  currentPage,
  siblingCount
}) {
  return (0, import_react.useMemo)(() => {
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
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { "aria-label": "Pagination", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "pagination", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: () => goToPage(currentPage - 1),
        disabled: currentPage === 1,
        children: "Prev"
      }
    ) }),
    paginationRange.map((page, idx) => {
      if (page === DOTS) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "dots", children: "..." }, `dots-${idx}`);
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: () => goToPage(currentPage + 1),
        disabled: currentPage === totalPages,
        children: "Next"
      }
    ) })
  ] }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pagination
});
//# sourceMappingURL=index.js.map