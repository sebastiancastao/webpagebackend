import crypto from "crypto";

export function verifySignature(appSecret: string, rawBody: string, signatureHeader?: string): boolean {
  if (!signatureHeader) return false;

  const expectedSignature = "sha256=" + crypto
    .createHmac("sha256", appSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signatureHeader),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}
