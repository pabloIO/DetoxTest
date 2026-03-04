// export type User = {
//   id: string;
//   email: string;
//   token: string;
// };

export type User = {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
