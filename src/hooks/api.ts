import { queryKeys } from '@src/lib';
import { useQuery } from '@tanstack/react-query';

export function useInvoiceDetail(id: string) {
  return useQuery(queryKeys.invoices.detail(id));
}

export function useInvoiceList() {
  return useQuery(queryKeys.invoices.list());
}
