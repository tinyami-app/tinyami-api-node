export interface ImageUploadResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  originalSize: number;
  originalUrl: string;
  createdAt: string;
}

export interface ImageOptimizeResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  originalSize: number;
  optimizedSize?: number;
  originalUrl: string;
  optimizedUrl?: string;
  createdAt: string;
  completedAt?: string;
}

export interface ImageStatusResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  originalSize: number;
  optimizedSize?: number;
  originalUrl: string;
  optimizedUrl?: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

export interface TinyamiError {
  code: string;
  message: string;
  details?: any;
}

export interface ImageListResponse {
  status: string;
  msg: string;
  images: OriginalImageOut[];
}

export interface ImageConvertResponse {
  status: string;
  msg: string;
  converted: VariantResponse;
}

export interface ImageResizeResponse {
  status: string;
  msg: string;
  resized: VariantResponse;
}

export interface FormatListResponse {
  msg: string;
  formats: FormatResponse[];
}

export interface VariantListResponse {
  msg: string;
  variants: VariantResponse[];
}

export interface OriginalImageOut {
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

export interface FormatResponse {
  id: number;
  original_image_id: number;
  format: string;
  s3_path: string;
  size: number;
  reduction: number;
  created_at: string;
  updated_at: string | null;
}

export interface VariantResponse {
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