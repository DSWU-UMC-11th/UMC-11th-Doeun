// Access Token(JWT)의 payload에 담긴 sub 값이 회원 ID
export function getMemberIdFromToken(accessToken: string | null): number | null {
  if (!accessToken) return null;

  try {
    const payload = accessToken.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const { sub } = JSON.parse(atob(base64)) as { sub?: string };
    const memberId = Number(sub);
    return Number.isInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}
