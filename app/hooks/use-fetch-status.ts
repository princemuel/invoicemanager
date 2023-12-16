import { useState } from "react";

type FetchStatus =
  | "idle"
  | "pending"
  | "delayed"
  | "canceled"
  | "failed"
  | "success";

export const useFetchStatus = (defaultValue: FetchStatus = "idle") =>
  useState<FetchStatus>(defaultValue);
