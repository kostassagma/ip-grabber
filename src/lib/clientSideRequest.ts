
export async function authOnlyResHandler(
  path: string,
  accessToken: string,
  init?: RequestInit | undefined
) {
  const res = await fetch(path, {
    ...init,
    headers: { ...init?.headers, authorization: `bearer ${accessToken}` },
  });
  if (res.status === 401) {
    console.log(`Error->${path} token-> ${accessToken}`);
    
    throw new Error("Not Authenticated");
  }
  return res;
}
