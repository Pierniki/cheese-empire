import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers';
import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

type Props = {
  perPage: number;
  pageIdx: number;
  allItemsCount: number;
  setPage: (page: number) => void;
  disabled?: boolean;
};

export const Pagination: React.FC<Props> = ({ pageIdx, perPage, setPage, allItemsCount, disabled }) => {
  const lastPage = Math.ceil(allItemsCount / perPage);

  const paginationStart = pageIdx + 1 - 2 > 0 ? pageIdx + 1 - 2 : 1;
  const paginationEnd = pageIdx + 3 > lastPage ? lastPage : pageIdx + 3;

  if (lastPage <= 1) return null;

  return (
    <div className="flex h-4 w-full items-center justify-center gap-1 text-lg text-stone-900">
      <button
        disabled={disabled || pageIdx === 0}
        className="disabled:opacity-50"
        onClick={() => setPage(0)}
        name="pagination-start"
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        disabled={disabled || pageIdx === 0}
        className="disabled:opacity-50"
        onClick={() => setPage(pageIdx - 1)}
        name="pagination-back"
      >
        <FaAngleLeft />
      </button>
      {getArrayOfNumbers(paginationStart, paginationEnd)
        .slice()
        .map((pg) => {
          return (
            <button
              disabled={disabled || paginationStart === paginationEnd}
              onClick={() => setPage(pg - 1)}
              key={'pag-' + pg}
              className={`${
                pageIdx + 1 === pg ? 'bg-stone-900 text-gray-50' : 'bg-amber-300'
              } flex h-6 w-6 items-center justify-center font-bold shadow-sm disabled:opacity-50`}
            >
              <span>{pg}</span>
            </button>
          );
        })}
      <button
        disabled={disabled || pageIdx === lastPage - 1}
        className="disabled:opacity-50"
        onClick={() => setPage(pageIdx + 1)}
        name="pagination-forward"
      >
        <FaAngleRight />
      </button>
      <button
        disabled={disabled || pageIdx === lastPage - 1}
        className="disabled:opacity-50"
        onClick={() => setPage(lastPage - 1)}
        name="pagination-end"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};
