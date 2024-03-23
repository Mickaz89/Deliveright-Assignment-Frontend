import axios from '../utils/axios';

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (access_token: string) => {
  if (!access_token) {
    return false;
  }

  const decoded = jwtDecode(access_token);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('access_token');

    window.location.href = 'login';
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (access_token: string | null) => {
  if (access_token) {
    localStorage.setItem('access_token', access_token);

    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(access_token); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    localStorage.removeItem('access_token');

    delete axios.defaults.headers.common.Authorization;
  }
};
