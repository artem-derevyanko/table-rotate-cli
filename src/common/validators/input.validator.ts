import { ValidationError } from '../errors/validation.error';

interface RawInput {
  id?: unknown;

  json?: unknown;
}

type Id = number | null;
type List = number[];

type IdValidationResult = [Error | null, Id];
type ListValidationResult = [Error | null, List];
type InputValidationResult = [Error | null, { id: Id; list: List }];

const isValidRaw = (raw: unknown): raw is RawInput => !!raw && typeof raw === 'object';

const parseRaw = (raw: unknown) => {
  if (!isValidRaw(raw)) {
    return { id: null, list: null };
  }

  return {
    id: typeof raw.id === 'number' || typeof raw.id === 'string' ? String(raw.id) : null,
    list: raw.json ? String(raw.json) : null,
  };
};

const validateId = (rawId: string): IdValidationResult => {
  const id = Number.parseFloat(rawId);
  if (!Number.isFinite(id) || id <= 0) {
    return [new ValidationError('Expected "id" to be a positive number'), 0];
  }

  return [null, id];
};

const validateList = (rawList: string): ListValidationResult => {
  try {
    const json: unknown = JSON.parse(rawList);
    if (!Array.isArray(json)) {
      return [new ValidationError('Expected "json" to be an array'), []];
    }

    const items: number[] = [];

    for (const rawItem of json) {
      const item = Number.parseFloat(String(rawItem));
      if (!Number.isFinite(item)) {
        return [new ValidationError('Expected "json" item to be a number'), []];
      }

      items.push(item);
    }

    return [null, items];
  } catch {
    return [new ValidationError('There an error during "json" parsing'), []];
  }
};

const ValidationEmptyResult = Object.freeze({ id: null, list: [] });

export const validateInput = (raw: unknown): InputValidationResult => {
  const parsedRaw = parseRaw(raw);
  if (!parsedRaw.id) {
    return [new ValidationError('The "id" field is expected'), ValidationEmptyResult];
  }

  const [idError, id] = validateId(parsedRaw.id);
  if (idError) {
    return [idError, ValidationEmptyResult];
  }

  if (!parsedRaw.list) {
    return [new ValidationError('The "json" field is expected'), { id, list: [] }];
  }

  const [listError, list] = validateList(parsedRaw.list);
  if (listError) {
    return [listError, { id, list: [] }];
  }

  return [null, { id, list }];
};
