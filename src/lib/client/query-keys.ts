import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { fetchInvoices, fetchSingleInvoice } from '../static';

// if you prefer to declare everything in one file
export const queryKeys = createQueryKeyStore({
  users: {
    all: null,
    detail: (userId: string) => ({
      queryKey: [userId],
      // queryFn: () => api.getUser(userId),
    }),
  },
  invoices: {
    detail: (invoiceId: string) => ({
      queryKey: [invoiceId],
      queryFn: () => fetchSingleInvoice(invoiceId),
    }),
    list: () => ({ queryKey: ['invoices'], queryFn: fetchInvoices }),
    // list: (filters: InvoiceFilters) => ({
    //   queryKey: [{ filters }],
    //   queryFn: (ctx) => api.getInvoices({ filters, page: ctx.pageParam }),
    //   contextQueries: {
    //     search: (query: string, limit = 15) => ({
    //       queryKey: [query, limit],
    //       queryFn: (ctx) =>
    //         api.getSearchInvoices({
    //           page: ctx.pageParam,
    //           filters,
    //           limit,
    //           query,
    //         }),
    //     }),
    //   },
    // }),
  },
});
