import type { InputProps } from "../types/InputProps";

  
  export function getInputProps(type: string = "text", label?: string): InputProps {
    return { variant: "bordered", type: type, label: label };
  }