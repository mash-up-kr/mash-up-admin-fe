export interface StorageRequest {
  keyString: string;
  valueMap: { [key: string]: any };
}

export type StorageResponse = StorageRequest;
