export const CLEAR = 'CLEAR';
export const clear = () => {
  return {
    type: CLEAR,
  };
}
export const UPDATE = 'UPDATE';
export const update = (data) => {
  return {
    type: UPDATE,
    data: data
  };
}
