import { validateInput } from './input.validator';

import { ValidationError } from '../errors/validation.error';

it('should be an error when "id" field is missed', () => {
  const [error] = validateInput({});

  expect(error).toBeInstanceOf(ValidationError);
  expect(error?.message).toBe('The "id" field is expected');
});

it('should be an error when "json" field is missed', () => {
  const [error] = validateInput({ id: '1' });

  expect(error).toBeInstanceOf(ValidationError);
  expect(error?.message).toBe('The "json" field is expected');
});

it.each(['bad-id', 'undefined', 0, -5, 's12.23', Number.POSITIVE_INFINITY])(
  'should be an error when "id" is not a positive number',
  (input) => {
    const [error] = validateInput({ id: input, json: '[]' });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error?.message).toBe('Expected "id" to be a positive number');
  },
);

it.each(['[1 2]', 'undefined', '[11,s]'])(
  'should be an error when "json" cannot be parsed',
  (input) => {
    const [error] = validateInput({ id: 1, json: input });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error?.message).toBe('There an error during "json" parsing');
  },
);

it.each(['{ "a": 1 }', 'true'])('should be an error when "json" is not an array', (input) => {
  const [error] = validateInput({ id: 1, json: input });

  expect(error).toBeInstanceOf(ValidationError);
  expect(error?.message).toBe('Expected "json" to be an array');
});

it.each(['["a", 5, "b"]', '[true]', '[null]'])(
  'should be an error when "json" is not an array of numbers',
  (input) => {
    const [error] = validateInput({ id: 1, json: input });

    expect(error).toBeInstanceOf(ValidationError);
    expect(error?.message).toBe('Expected "json" item to be a number');
  },
);

it.each([
  ['1', '{}', 1],
  ['3', "[1, 'a', 2]", 3],
  ['157', '[1 2]', 157],
])('should parse and validate "id" if it\'s possible', (inputId, json, expected) => {
  const [error, { id, list }] = validateInput({ id: inputId, json });

  expect(id).toBe(expected);
  expect(list.length).toBe(0);
  expect(error).toBeInstanceOf(ValidationError);
});

it.each([
  ['[]', []],
  ['[0, 1, 2, 3, 4, 5]', [0, 1, 2, 3, 4, 5]],
  ['[-4, 0, -123, 13]', [-4, 0, -123, 13]],
])('should parse and validate input', (json, expected) => {
  const id = 5;
  const [error, received] = validateInput({ id, json });

  expect(error).toBeNull();
  expect(received.id).toBe(id);
  expect(received.list).toEqual(expected);
});
