/**
 * Hands a File from the landing-page dropzone to the tool page
 * without serialising it. Module-scoped, cleared on read.
 */
let pending: File | null = null;

export function setPendingFile(file: File) {
  pending = file;
}

export function takePendingFile(): File | null {
  const file = pending;
  pending = null;
  return file;
}
