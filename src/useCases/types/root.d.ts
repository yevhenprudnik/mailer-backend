import { UseCase } from './useCase.d.ts';

interface Root {
  healthcheck: UseCase<{}, string>;
}

export function init(): Root;
