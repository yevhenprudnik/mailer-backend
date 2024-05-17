/** @type {import('../useCases/types/useCase.d.ts').Session} */
export const DEFAULT_SESSION = {
  user: {},
  token: '',
};

export const DEFAULT_HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Slug, X-UID',
  'Content-Type': 'application/json; charset=UTF-8',
};
