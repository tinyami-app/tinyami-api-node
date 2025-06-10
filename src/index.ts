import { createHttpClient, TinyamiConfig, TinyamiHttpError } from './http';
import * as images from './api/images';
import { ImageUploadResponse, ImageOptimizeResponse, ImageStatusResponse, ImageListResponse, ImageConvertResponse, ImageResizeResponse, FormatListResponse, VariantListResponse } from './types';

export { TinyamiHttpError } from './http';
export * from './types';

export class TinyamiClient {
  private client;

  constructor(config: TinyamiConfig) {
    this.client = createHttpClient(config);
  }

  /**
   * Upload an image to Tinyami
   * @param filePath - Path to the image file
   * @returns Promise with upload response
   */
  async uploadImage(filePath: string): Promise<ImageUploadResponse> {
    return images.uploadImage(this.client, filePath);
  }

  /**
   * Upload an image from a URL
   * @param url - URL of the image to upload
   * @returns Promise with upload response
   */
  async uploadImageFromUrl(url: string): Promise<ImageUploadResponse> {
    return images.uploadImageFromUrl(this.client, url);
  }

  /**
   * Optimize an uploaded image
   * @param imageId - ID of the uploaded image
   * @returns Promise with optimization response
   */
  async optimizeImage(imageId: number, format: string): Promise<ImageOptimizeResponse> {
    return images.optimizeImage(this.client, imageId, format);
  }

  /**
   * Get the info of an image
   * @param imageId - ID of the uploaded image
   * @returns Promise with image info
   */
  async getImageInfo(imageId: number): Promise<ImageStatusResponse> {
    return images.getImageInfo(this.client, imageId);
  }

  /**
   * Delete an uploaded image
   * @param imageId - ID of the uploaded image
   * @returns Promise that resolves when the image is deleted
   */
  async deleteImage(imageId: number): Promise<void> {
    return images.deleteImage(this.client, imageId);
  }

  /**
   * Get the list of images
   * @param page - Page number
   * @param limit - Number of images per page
   * @returns Promise with image list response
   */
  async getImagesList(page: number = 1, limit: number = 20): Promise<ImageListResponse> {
    return images.getImagesList(this.client, page, limit);
  }

  /**
   * Convert an image to a different format
   * @param imageId - ID of the uploaded image
   * @param type - Format to convert to
   * @returns Promise with conversion response
   */
  async convertImage(imageId: number, type: string): Promise<ImageConvertResponse> {
    return images.convertImage(this.client, imageId, type);
  }

  /**
   * Resize an image
   * @param imageId - ID of the uploaded image
   * @param method - Resize method
   * @param width - New width
   * @param height - New height
   * @returns Promise with resize response
   */
  async resizeImage(imageId: number, method: string, width?: number, height?: number): Promise<ImageResizeResponse> {
    return images.resizeImage(this.client, imageId, method, width, height);
  }

  /**
   * Get the list of formats for an image
   * @param imageId - ID of the uploaded image
   * @returns Promise with format list response
   */
  async getImageFormats(imageId: number): Promise<FormatListResponse> {
    return images.getImageFormats(this.client, imageId);
  }

  /**
   * Get the list of variants for an image
   * @param imageId - ID of the uploaded image
   * @returns Promise with variant list response
   */
  async getImageVariants(imageId: number): Promise<VariantListResponse> {
    return images.getImageVariants(this.client, imageId);
  }

  /**
   * Delete a format for an image
   * @param imageId - ID of the uploaded image
   * @param formatId - ID of the format to delete
   * @returns Promise that resolves when the format is deleted
   */
  async deleteImageFormat(imageId: number, formatId: number): Promise<void> {
    return images.deleteImageFormat(this.client, imageId, formatId);
  }
}