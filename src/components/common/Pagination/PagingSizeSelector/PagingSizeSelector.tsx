import React from 'react';

const OPTIONS = [10, 20, 30, 50, 100];

interface Props {
  pagingSize: number;
  handleChangeSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PagingSizeSelector = ({ pagingSize, handleChangeSize }: Props) => (
  <select
    aria-label="Paging size selector"
    value={pagingSize}
    onChange={(e) => {
      handleChangeSize(e);
    }}
  >
    {OPTIONS.map((size) => (
      <option key={`pagingSize${size}`}>{size}</option>
    ))}
  </select>
);

export default PagingSizeSelector;
