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

export async function optimizeImage(client: AxiosInstance, imageId: number, format: string): Promise<ImageOptimizeResponse> {
  const form = new FormData();
  form.append('type', format);
  const headers = form.getHeaders();
  const response = await client.post<ImageOptimizeResponse>(`/images/${imageId}/optimize`, form, { headers });
  return response.data;
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
  const response = await client.post<ImageConvertResponse>(
    `/images/${imageId}/convert`,
    { type }
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
  const response = await client.post<ImageResizeResponse>(
    `/images/${imageId}/resize`,
    { method, width, height }
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