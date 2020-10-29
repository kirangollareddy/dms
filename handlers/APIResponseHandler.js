class APIResponseHandler {
  #status
  #message
  #data
  #error
  #statusCode

  constructor(error, message, data) {
    if(error){
      this.#message = message;
      this.#error = error; //TODO - based on NODE_ENV exclude error in production.
      this.#status = 0;
      this.#statusCode = error.statusCode||500;
    } else {
      this.#status = 1;
      this.#statusCode = 200;
      this.#data = data;
    }
  }

  getResponse(){
    return {
      status: this.#status,
      message: this.#message,
      data: this.#data,
      error: this.#error,
      statusCode: this.#statusCode
    }
  }
}

exports = APIResponseHandler;