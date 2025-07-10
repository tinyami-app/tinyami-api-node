import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { AxiosInstance } from 'axios';
import { 
  ImageUploadResponse, 
  ImageOptimizeResponse, 
  ImageStatusResponse,
  ImageListResponse,
  ImageConvertResponse,
  ImageResizeResponse,
  FormatListResponse,
  VariantListResponse
} from '../types';

export async function uploadImage(client: AxiosInstance, filePath: string): Promise<ImageUploadResponse> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const headers = form.getHeaders();
  const response = await client.post<ImageUploadResponse>('/images/upload', form, { headers });
  return response.data;
}

export async function uploadImageFromUrl(client: AxiosInstance, image_url: string): Promise<ImageUploadResponse> {
  const form = new FormData();
  form.append('image_url', image_url);
  const headers = form.getHeaders();
  const response = await client.post<ImageUploadResponse>('/images/upload', form, { headers });
  return response.data;
}

export async function optimizeImage(client: AxiosInstance, imageId: number, format: string): Promise<ImageOptimizeResponse | { success: false; error: any }> {
  try {
    // Clean the format parameter - remove any dot prefix
    const cleanFormat = format.replace(/^\./, '').toLowerCase();
    
    // Validate format
    const validFormats = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
    if (!validFormats.includes(cleanFormat)) {
      return {
        success: false,
        error: {
          code: 'INVALID_FORMAT',
          message: `Invalid format: ${format}. Must be one of: ${validFormats.join(', ')}`,
          details: { provided: format, cleaned: cleanFormat }
        }
      };
    }
    
    const form = new FormData();
    form.append('type', cleanFormat);
    const headers = form.getHeaders();
    const response = await client.post<ImageOptimizeResponse>(`/images/${imageId}/optimize`, form, { headers });
    return response.data;
  } catch (error: any) {
    // Return error as JSON instead of throwing
    return {
      success: false,
      error: error.error || error
    };
  }
}

export async function getImageInfo(client: AxiosInstance, imageId: number): Promise<ImageStatusResponse> {
  const response = await client.get<ImageStatusResponse>(`/images/${imageId}`);
  return response.data;
}

export async function deleteImage(client: AxiosInstance, imageId: number): Promise<void> {
  await client.delete(`/images/${imageId}`);
}

export async function getImagesList(
  client: AxiosInstance, 
  page: number = 1, 
  limit: number = 20
): Promise<ImageListResponse> {
  const response = await client.get<ImageListResponse>('/images', {
    params: { page, limit }
  });
  return response.data;
}

export async function convertImage(
  client: AxiosInstance, 
  imageId: number, 
  type: string
): Promise<ImageConvertResponse> {
  // Validate type parameter
  const validTypes = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  if (!validTypes.includes(type.toLowerCase())) {
    throw new Error(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
  }
  const form = new FormData();
  form.append('type', type);
  const headers = form.getHeaders();
  // Send as application/x-www-form-urlencoded instead of FormData
  const response = await client.post<ImageConvertResponse>(
    `/images/${imageId}/convert`,
    form,
    { headers }
  );
  return response.data;
}

export async function resizeImage(
  client: AxiosInstance,
  imageId: number,
  method: string,
  width?: number,
  height?: number
): Promise<ImageResizeResponse> {
  const form = new FormData();
  form.append('method', method);
  form.append('width', width?.toString() || '');
  form.append('height', height?.toString() || '');
  const headers = form.getHeaders();
  const response = await client.post<ImageResizeResponse>(
    `/images/${imageId}/resize`,
    form,
    { headers }
  );
  return response.data;
}

export async function getImageFormats(
  client: AxiosInstance,
  imageId: number
): Promise<FormatListResponse> {
  const response = await client.get<FormatListResponse>(`/images/${imageId}/formats`);
  return response.data;
}

export async function getImageVariants(
  client: AxiosInstance,
  imageId: number
): Promise<VariantListResponse> {
  const response = await client.get<VariantListResponse>(`/images/${imageId}/variants`);
  return response.data;
}

export async function deleteImageFormat(
  client: AxiosInstance,
  imageId: number,
  formatId: number
): Promise<void> {
  await client.delete(`/images/${imageId}/formats/${formatId}`);
}

export async function deleteImageVariant(
  client: AxiosInstance,
  imageId: number,
  variantId: number
): Promise<void> {
  await client.delete(`/images/${imageId}/variants/${variantId}`);
}