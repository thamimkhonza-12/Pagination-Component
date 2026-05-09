import React, { useState } from "react";
import Pagination from "../src/components/Pagination/Pagination";

export default {
  title: "Components/Pagination",
  component: Pagination,
};

export const Default = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={200}
      pageSize={10}
      currentPage={page}
      onChange={setPage}
    />
  );
};

export const LargeDataset = () => {
  const [page, setPage] = useState(10);

  return (
    <Pagination
      total={2000}
      pageSize={10}
      currentPage={page}
      onChange={setPage}
    />
  );
};