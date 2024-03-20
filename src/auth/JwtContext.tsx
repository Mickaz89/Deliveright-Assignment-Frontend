import { createContext, useEffect, useReducer, useCallback, ReactNode } from 'react';
import axios from '../utils/axios';
import { isValidToken, setSession } from './utils';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any;
  method: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string, name: string) => Promise<void>;
  error: string;
}

interface Action {
  type: string;
  payload?: {
    isAuthenticated: boolean;
    user: any;
    error?: string;
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
  error: ""
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
        error:""
      };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user || null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      case 'ERROR':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload?.error || ""
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

        const response = await axios.get('/auth/profile');

        const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
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
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
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
      const { access_token, user } = response.data;
      setSession(access_token);

      dispatch({
        type: 'LOGIN',
        payload: {
          isAuthenticated: true, // Add the missing property
          user,
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
    const response = await axios.post('/auth/register', {
      username,
      password,
      name
    });
    const { access_token, user } = response.data;
    setSession(access_token);
    dispatch({
      type: 'REGISTER',
      payload: {
        isAuthenticated: true,
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
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