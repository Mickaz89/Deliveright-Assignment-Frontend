import { createContext, useEffect, useReducer, useCallback, ReactNode } from 'react';
import axios from '../utils/axios';
import { isValidToken, jwtDecode, setSession } from './utils';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any;
  method: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string, name: string) => Promise<void>;
  error: string | null;
}

interface Action {
  type: string;
  payload?: {
    isAuthenticated?: boolean;
    user?: any;
    error?: string | null;
  };
}

const initialState: State = {
  isInitialized: false,
  isAuthenticated: false,
  method: "jwt",
  user: null,
  login: function (username: string, password: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  logout: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  register: function (username: string, password: string, name: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  error: null
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIAL':
      return {
        isInitialized: true,
        method: 'jwt',
        isAuthenticated: action.payload?.isAuthenticated || false,
        user: action.payload?.user || null,
        login: initialState.login,
        logout: initialState.logout,
        register: initialState.register,
        error: null
      };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user || null,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case 'ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload?.error || null
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<State | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (access_token && isValidToken(access_token)) {
        setSession(access_token);
        const decoded = jwtDecode(access_token);
        const user = decoded.name

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
            error: null
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
          error: error.message as string
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      });
      const { access_token } = response.data;
      const decoded = jwtDecode(access_token);
      const user = decoded.name
      setSession(access_token);

      dispatch({
        type: 'LOGIN',
        payload: {
          isAuthenticated: true, // Add the missing property
          error: null,
          user
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'ERROR',
        payload: {
          isAuthenticated: false,
          user: null,
          error: error.message as string,
        },
      });
    }
  };

  const register = async (username: string, password: string, name: string) => {
    try {
      const response = await axios.post('/auth/register', {
        username,
        password,
        name
      });
      const { access_token } = response.data;
      setSession(access_token);
      const decoded = jwtDecode(access_token);
      const user = decoded.name

      dispatch({
        type: 'REGISTER',
        payload: {
          isAuthenticated: true,
          user,
          error: null
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'ERROR',
        payload: {
          isAuthenticated: false,
          user: null,
          error: error.message as string,
        },
      });
    }

  };

  const logout = async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
      payload: {
        isAuthenticated: false,
        error: null
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}