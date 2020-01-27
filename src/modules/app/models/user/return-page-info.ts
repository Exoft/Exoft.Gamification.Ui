export class ReturningPagingInfo<T> {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}