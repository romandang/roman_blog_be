import { JwtPayload, jwtDecode } from 'jwt-decode';

export const getUserIdFromJwt = (jwt) => {
  try {
    const { id }: any = jwtDecode<JwtPayload>(jwt);
    return id;
  } catch (error) {
    return '';
  }
};
