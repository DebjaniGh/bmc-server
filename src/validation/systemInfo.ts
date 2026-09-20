import { z } from "zod";

// RFC 1123 hostname: dot-separated labels of letters/digits/hyphens,
// each 1-63 chars, no leading or trailing hyphen.
const HOSTNAME_REGEX =
  /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*$/;

export const systemInfoPatchSchema = z
  .object({
    hostName: z
      .string()
      .trim()
      .min(1, "Host name is required")
      .max(253, "Host name must be at most 253 characters")
      .regex(HOSTNAME_REGEX, "Invalid host name format"),
    assetTag: z.string().trim().max(64, "Asset tag must be at most 64 characters"),
    location: z.string().trim().max(128, "Location must be at most 128 characters"),
    adminContact: z
      .string()
      .trim()
      .max(128, "Admin contact must be at most 128 characters"),
  })
  .partial()
  .strict()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one editable field must be provided",
  });
