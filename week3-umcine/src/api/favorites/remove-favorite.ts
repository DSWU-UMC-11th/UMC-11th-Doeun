import { authApi } from "../auth-api";

export async function removeFavorite(movieId: number): Promise<void> {
  await authApi.delete(`favorites/${movieId}`);
}
