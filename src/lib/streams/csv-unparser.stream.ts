import { format } from 'fast-csv';

export const createCSVUnparserStream = () =>
  format({
    headers: true,
    quoteColumns: {
      json: true,
    },
    quoteHeaders: {
      json: false,
    },
  });
