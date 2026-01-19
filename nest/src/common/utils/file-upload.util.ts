import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { join } from "path";

export const AVATAR_UPLOAD_DIR = join(process.cwd(), "uploads", "avatars");

// Ensure upload directory exists
if (!existsSync(AVATAR_UPLOAD_DIR)) {
  mkdirSync(AVATAR_UPLOAD_DIR, { recursive: true });
}

// Allowed image mime types for avatars
export const AVATAR_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

// Max avatar file size (5MB)
export const AVATAR_MAX_FILE_SIZE = 5 * 1024 * 1024;

export const avatarFileFilter = (req: any, file: any, callback: any) => {
  if (!AVATAR_ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return callback(
      new BadRequestException(
        "Định dạng file không hợp lệ. Chỉ chấp nhận: JPG, JPEG, PNG, GIF, WEBP",
      ),
      false,
    );
  }
  callback(null, true);
};

export const avatarStorage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, AVATAR_UPLOAD_DIR);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `avatar-${uniqueSuffix}${ext}`);
  },
});

/**
 * Delete old avatar file from disk
 */
export const deleteAvatarFile = (avatarPath: string) => {
  try {
    // Extract filename from URL path
    if (avatarPath && avatarPath.includes("/uploads/avatars/")) {
      const filename = avatarPath.split("/uploads/avatars/")[1];
      const fullPath = join(AVATAR_UPLOAD_DIR, filename);
      if (existsSync(fullPath)) {
        unlinkSync(fullPath);
      }
    }
  } catch (error) {
    // Ignore errors when deleting old avatar
    console.error("Error deleting avatar file:", error);
  }
};
