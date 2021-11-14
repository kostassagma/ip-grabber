import { JWT_SECRET_KEY } from "./constants";

export default function getJWTKey():Uint8Array {
  const textEncoder = new TextEncoder()
  const key = textEncoder.encode(JWT_SECRET_KEY)
  return new Uint8Array(key)
}