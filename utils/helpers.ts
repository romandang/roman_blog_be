import { JwtPayload, jwtDecode } from 'jwt-decode';
import isNull from 'lodash/isNull'

export const getUserIdFromJwt = (jwt) => {
  try {
    const { id }: any = jwtDecode<JwtPayload>(jwt);
    return id;
  } catch (error) {
    return '';
  }
};

export const cleanData = (data) => {
  if (typeof data !== "object" || !data) return data;
  const newObj = {};

  for (const key of Object.keys(data)) {
    let value = data[key];
    if (value === null) value = ""
    Object.assign(newObj, { [key]: value })
  }

  return newObj;
}