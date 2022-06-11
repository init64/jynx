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

  public static UnauthorizedError() {
    return new ResponseDto(401, "You not authorized")
  }

  public static BadRequest(message: string="Bad request") {
    return new ResponseDto(400, message)
  }

  public static NotFoundError(message: string="Content not found") {
    return new ResponseDto(404, message)
  }
}

export default ResponseDto;