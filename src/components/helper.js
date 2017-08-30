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
    Authorization: 'bearer ' + authToken(),
    'Content-Type': 'application/json'
  };
}