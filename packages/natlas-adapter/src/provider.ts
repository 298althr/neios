// N-ATLAS provider interface — the single seam through which all model calls
// pass (direction doc §5.E). N-ATLAS-specific network logic must not live
// anywhere else in the application.

export interface NAtlasRequest {
  /** Optional system/context prompt built by the Context Builder. */
  system?: string;
  /** User-level prompt content. */
  prompt: string;
  /** Sampling controls. */
  maxTokens?: number;
  temperature?: number;
  /** Caller's request ID, for audit binding. */
  requestId?: string;
}

export interface NAtlasResponse {
  text: string;
  /** Model identifier as reported by the serving backend. */
  model: string;
  /** Backend request ID if provided. */
  requestId?: string;
  latencyMs: number;
  finishReason?: string;
}

export interface NAtlasProvider {
  generate(request: NAtlasRequest): Promise<NAtlasResponse>;
}
