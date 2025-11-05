
export type JsonPatchOperation = {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
};

export type PatchFormType = JsonPatchOperation[];