class ResponseDto {
  code: number;
  message: string;
  data?: any;

  constructor(code, message, data?) {
    this.code = code;
    this.message = message;

    if (data) {
      this.data = data;
    }
  }
}

export default ResponseDto;