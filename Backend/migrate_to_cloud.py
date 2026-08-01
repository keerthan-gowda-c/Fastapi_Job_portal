import os
import cloudinary
import cloudinary.uploader

from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

UPLOADS_DIR = "uploads"

for root, dirs, files in os.walk(UPLOADS_DIR):
    for file in files:
        file_path = os.path.join(root, file)

        # Preserve folder structure in Cloudinary
        relative_folder = os.path.relpath(root, UPLOADS_DIR)

        result = cloudinary.uploader.upload(
            file_path,
            folder=f"jobportal/{relative_folder}"
        )

        print(f"{file_path} -> {result['secure_url']}")