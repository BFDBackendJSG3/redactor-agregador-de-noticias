import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function PaginationIcons({ page, pages, setPage, metaData, totalPages }) {
  return (
    <Pagination className="mb-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={
              page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setPage((p) =>
                metaData?.totalPages
                  ? Math.min(p + 1, metaData.totalPages)
                  : p + 1
              )
            }
            className={
              page === totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationIcons;
