export function authToken() {
  return localStorage.getItem('AUTH_TOKEN');
}

export function isLoggedIn() {
  if (authToken()) {
    return true;
  } else {
    return false;
  }
}


export function apiHeader() {
  return {
    headers: {
      Authorization: 'bearer ' + authToken(),
      'Content-Type': 'application/json'
    }
  };
}

export function currentUser() {
  return JSON.parse(localStorage.getItem('CURRENT_USER'));
}


export function isObjectEmpty(object) {
  return Object.getOwnPropertyNames(object).length === 0;
}


export function str2bool(value) {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return value;
}


export function checkStatus(responsePromise) {
  responsePromise.catch(function(error) {
    if (error.response.status === 401) {
      localStorage.clear();
    }
  });
  return responsePromise;
}