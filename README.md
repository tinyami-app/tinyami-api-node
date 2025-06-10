# Tinyami Node.js Client

Official Node.js client for the Tinyami API - Image optimization service.

## Installation

```bash
npm install tinyami-api
```

## Usage

```typescript
import { TinyamiClient } from 'tinyami-api';

// Initialize the client
const client = new TinyamiClient({
  apiKey: 'your-api-key', // Your Tinyami API key
  // Optional configuration
  baseURL: 'https://api.tinyami.com', // Default
  timeout: 30000, // Default: 30 seconds
  maxRetries: 3, // Optional: Number of retry attempts
});

// Upload an image
const uploadResult = await client.uploadImage('/path/to/image.jpg');
console.log('Uploaded image ID:', uploadResult.image.id);

// Optimize the image
const optimizeResult = await client.optimizeImage(uploadResult.image.id);
console.log('Optimized image URL:', optimizeResult.optimized.preview_url);

// Check image status
const status = await client.getImageStatus(uploadResult.image.id);
console.log('Image status:', status.status);

// Delete the image
await client.deleteImage(uploadResult.image.id);
```

## API Reference

### TinyamiClient

The main client class for interacting with the Tinyami API.

#### Constructor

```typescript
new TinyamiClient(config: TinyamiConfig)
```

Configuration options:
- `apiKey` (required): Your Tinyami API key (X-Tinyami-Access-Token)
- `baseURL` (optional): API base URL (default: 'https://api.tinyami.com')
- `timeout` (optional): Request timeout in milliseconds (default: 30000)
- `maxRetries` (optional): Number of retry attempts for failed requests (default: 3)

#### Methods

##### uploadImage(filePath: string): Promise<ImageUploadResponse>

Uploads an image file to Tinyami. Supports large file uploads with proper FormData handling.

##### optimizeImage(imageId: string): Promise<ImageOptimizeResponse>

Optimizes a previously uploaded image.

##### getImageStatus(imageId: string): Promise<ImageStatusResponse>

Gets the current status of an image.

##### deleteImage(imageId: string): Promise<void>

Deletes an uploaded image.

##### getImagesList(page?: number, limit?: number): Promise<ImageListResponse>

Gets a paginated list of images.
- `page`: Page number (default: 1)
- `limit`: Number of images per page (default: 20, max: 50)

##### convertImage(imageId: string, type: string): Promise<ImageConvertResponse>

Converts an image to a different format.
- `imageId`: ID of the image to convert
- `type`: Target format (e.g., 'jpg', 'png', 'webp', 'avif')

##### resizeImage(imageId: string, method: string, width?: number, height?: number): Promise<ImageResizeResponse>

Resizes an image using specified method and dimensions.
- `imageId`: ID of the image to resize
- `method`: Resizing method (e.g., 'scale', 'fit', 'cover', 'thumb')
- `width`: Target width (optional)
- `height`: Target height (optional)

##### getImageFormats(imageId: string): Promise<FormatListResponse>

Gets all available formats for a specific image.
- `imageId`: ID of the image

##### getImageVariants(imageId: string): Promise<VariantListResponse>

Gets all variants of a specific image.
- `imageId`: ID of the image

##### deleteImageFormat(imageId: string, formatId: string): Promise<void>

Deletes a specific format of an image.
- `imageId`: ID of the image
- `formatId`: ID of the format to delete

## Response Types

### ImageUploadResponse
```typescript
{
  status: string;
  msg: string;
  image: OriginalImageOut;
}
```

### ImageOptimizeResponse
```typescript
{
  msg: string;
  optimized: {
    id: number;
    original_image_id: number;
    format: string;
    size: number;
    s3_path: string;
    reduction: number;
    created_at: string;
    preview_url: string;
    download_url: string;
  }
}
```

### ImageStatusResponse
```typescript
{
  status: string;
  msg: string;
  image_info: OriginalImageOut;
}
```

### ImageListResponse
```typescript
{
  status: string;
  msg: string;
  images: OriginalImageOut[];
}
```

### ImageConvertResponse
```typescript
{
  status: string;
  msg: string;
  converted: VariantResponse;
}
```

### ImageResizeResponse
```typescript
{
  status: string;
  msg: string;
  resized: VariantResponse;
}
```

### FormatListResponse
```typescript
{
  msg: string;
  formats: FormatResponse[];
}
```

### VariantListResponse
```typescript
{
  msg: string;
  variants: VariantResponse[];
}
```

### OriginalImageOut
```typescript
{
  id: number;
  origin_name: string;
  ext: string;
  mime_type: string;
  origin_size: number;
  uid: string;
  s3_path: string;
  created_at: string;
  updated_at: string | null;
}
```

### FormatResponse
```typescript
{
  id: number;
  original_image_id: number;
  format: string;
  s3_path: string;
  size: number;
  reduction: number;
  created_at: string;
  updated_at: string | null;
}
```

### VariantResponse
```typescript
{
  id: number;
  original_image_id: number;
  variant_type: string;
  format: string | null;
  width: number | null;
  height: number | null;
  fit: string | null;
  size_bytes: number | null;
  s3_path: string;
  created_at: string;
  updated_at: string | null;
  preview_url: string | null;
  download_url: string | null;
}
```

## Error Handling

The client throws `TinyamiHttpError` for API errors. You can catch and handle these errors:

```typescript
try {
  await client.uploadImage('/path/to/image.jpg');
} catch (error) {
  if (error instanceof TinyamiHttpError) {
    console.error('API Error:', error.error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Features

- Full TypeScript support
- Automatic FormData handling for file uploads
- Support for large file uploads
- Proper error handling with typed errors
- Automatic retry mechanism for failed requests
- Comprehensive API coverage

## License

MIT 