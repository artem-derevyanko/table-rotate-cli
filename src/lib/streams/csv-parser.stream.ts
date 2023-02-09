import { parse } from 'fast-csv';

export const createCSVParserStream = () => parse({ headers: true, ignoreEmpty: true });
