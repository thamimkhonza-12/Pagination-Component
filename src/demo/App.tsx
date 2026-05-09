import React, { useState } from "react";
import { Pagination } from "../index";

export default function App() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ padding: 40 }}>
      <h2>Pagination Demo</h2>

      <Pagination
        total={100}
        pageSize={10}
        currentPage={page}
        onChange={setPage}
      />

      <p>Current Page: {page}</p>
    </div>
  );
}