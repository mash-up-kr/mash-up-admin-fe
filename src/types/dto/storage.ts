export interface StorageRequest {
  keyString: string;
  valueMap: Record<string, any>;
}

export type StorageResponse = StorageRequest;
