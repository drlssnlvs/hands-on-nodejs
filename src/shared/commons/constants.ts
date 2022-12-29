export const ERRORS = {
  UNAUTHORIZED: {
    code: 401,
    json: {
      r: false,
      errors: ["401 - UNAUTHORIZED"],
    },
  },
  FORBIDDEN: {
    code: 403,
    json: {
      r: false,
      errors: ["403 - FORBIDDEN"],
    },
  },
};

export const UTILS = {
  PROJECTION: (obj: Object, fields: Object) => {
    var newObj: Object = obj;

    Object.keys(fields).map((item) => {
      if (fields[item] === 0) {
        delete newObj[item];
      }
    });

    return newObj;
  },
};
