import { User } from '../../entities/user.d.ts';

interface UseCaseOptions {
  access?: 'none' | 'common' | 'admin';
}

export interface Session {
  user: Partial<User>;
  token: string;
}

interface BaseHandler<Params, Result> {
  (session: Session, params: Params): Result;
}

export interface UseCase<Params, Result> extends UseCaseOptions {
  handler: BaseHandler<Params, Result>;
}

export type UseCasesContainer = Record<string, UseCase<any, any>>;
