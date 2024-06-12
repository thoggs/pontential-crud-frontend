export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
}

export type Pagination<T> = {
  data: T[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type MainResponse<T> = {
  code: number;
  message: any[];
  model: T;
}
