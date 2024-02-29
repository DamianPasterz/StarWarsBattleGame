export interface GlobalsState {
  loading: boolean;
  error: unknown;
}

export const initialState: GlobalsState = {
  loading: false,
  error: null,
};
