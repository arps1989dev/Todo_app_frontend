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
    headers: apiCustomHeader()
  };
}

export function apiCustomHeader() {
  return {
    Authorization: 'bearer ' + authToken(),
    'Content-Type': 'application/json'
  };
}


export function currentUser() {
  return JSON.parse(localStorage.getItem('CURRENT_USER'));
}
