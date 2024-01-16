import { Server } from 'http';
import { UseCasesContainer } from '../../../useCases/types/useCase.d.ts';
import { Common } from '../../types/common.d.ts';
import { Utils } from '../../types/utils.d.ts';

interface Deps {
  useCasesContainer: Record<string, UseCasesContainer>;
  common: Common;
  utils: Utils;
}

export function init(deps: Deps): Server;
