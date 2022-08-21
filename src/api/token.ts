import request from "./service";

export default {
  createToken: (param: any) => request.post('/jwt-auth/v1/token', param),
  validateToken: () => request.post('/jwt-auth/v1/token/validate')
}


