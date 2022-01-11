export class FileTypeValidator {
  private fileType: string;
  private validTypes: string[];

  constructor(fileType: string, validTypes: string[]) {
    this.fileType = fileType;
    this.validTypes = validTypes;
  }

  validateFileType(): boolean {
    return this.validTypes.includes(this.fileType);
  }

  getErrorMessage(): string {
    return `${this.fileType} is not an accepted file type.`;
  }
}


export class DocumentFileSizeValidator {
  private fileSizeInBytes: number;
  private maxFileSizeInBytes: number = 512000;

  constructor(fileSize: number) {
    this.fileSizeInBytes = fileSize;
  }

  validateFileSize(): boolean {
    return this.fileSizeInBytes <= this.maxFileSizeInBytes;
  }

  getErrorMessage(): string {
    return "Maximum file size accepted is 500kb.";
  }
}


export class FileService {
  private file: File;

  constructor(file: File) {
    this.file = file;
  }

  static getFileExtension(fileName: string): string {
    const fileNames: Array<string> = fileName?.split(".");

    if(!fileNames){
        return ""
    }

    if (fileNames.length === 0) {
      return "";
    }

    return fileNames[fileNames.length - 1];
  }

  private getFormData(): FormData {
    const formData = new FormData();
    formData.append("file", this.file);
    return formData;
  }
}



interface ValidatorResponse {
  isValid: boolean;
  errorMessage: string;
}

const fileTypes = ["jpg", "jpeg", "png", "doc", "docx", "pdf"];

async function validateFileSize(fileSize: number): Promise<ValidatorResponse> {
  const validator = new DocumentFileSizeValidator(fileSize);
  const isValid = validator.validateFileSize();

  return {
    isValid,
    errorMessage: isValid ? "" : validator.getErrorMessage(),
  };
}

async function validateFileType(fileType: string): Promise<ValidatorResponse> {
  const validator = new FileTypeValidator(fileType, fileTypes);
  const isValid = validator.validateFileType();

  return {
    isValid,
    errorMessage: isValid ? "" : validator.getErrorMessage(),
  };
}

export { validateFileSize, validateFileType };
