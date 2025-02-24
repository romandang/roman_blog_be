import { JwtPayload, jwtDecode } from 'jwt-decode';
import * as lodash from 'lodash';

export const getUserIdFromJwt = (jwt) => {
  try {
    const { id }: any = jwtDecode<JwtPayload>(jwt);
    return id;
  } catch (error) {
    return '';
  }
};

export const cleanData = (data) => {
  if (typeof data !== 'object' || !data || Array.isArray(data)) return data;
  const newObj = {};

  for (const key of Object.keys(data)) {
    let value = data[key];
    if (value === null) value = '';
    Object.assign(newObj, { [key]: value });
  }

  return newObj;
};

export const _ = lodash;

export const returnEmptyData = (data) => {
  if (!Array.isArray(data)) throw new Error('Your data is not type array');

  if (lodash.isEmpty(data)) return [];
  return data;
};

export const pickFieldsOnArrayObject = (
  data: Array<Object>,
  fieldsToPick: Array<Object>,
) => {
  const currentData = [];

  data.forEach((item) => {
    const currentItem = lodash.pick(item, fieldsToPick);
    currentData.push(currentItem);
  });

  return currentData;
};
