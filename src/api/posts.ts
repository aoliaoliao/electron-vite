import request from "./service";

export default {
  create: (param: any) => request.post('/wp/v2/posts', param)
}

