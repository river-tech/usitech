import Cookies from 'js-cookie';
const AuthApi = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Helper function to get auth token from cookies
  const getAuthToken = () => {
      return Cookies.get('access_token') || null;
    };

  // Helper function to set tokens with expires
  const setTokens = (accessToken: string, refreshToken: string, expiresIn = 15 * 60) => {
    if (typeof window !== 'undefined') {
      const expires = new Date(Date.now() + expiresIn * 1000);
      
      // Store access_token in cookies with expires
      Cookies.set('access_token', accessToken, {
        expires: expires,
        path: '/',
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      
      // Store refresh_token in localStorage
      localStorage.setItem('refresh_token', refreshToken);
      
      // Store token expiry time for countdown
      localStorage.setItem('token_expires_at', expires.getTime().toString());
    }
  };

  // Helper function to get refresh token from localStorage
  const getRefreshToken = () => {
    return localStorage.getItem('refresh_token') || null;
  };

  // Helper function to clear tokens (only when logout)
  const clearTokens = () => {
    if (typeof window !== 'undefined') {
      // Clear access_token from cookies
      Cookies.remove('access_token', { path: '/' });
      
      // Clear refresh_token from localStorage (only on logout)
      localStorage.removeItem('refresh_token');
      
      // Clear token expiry time
      localStorage.removeItem('token_expires_at');
    }
  };

  // Helper function to clear only access token (when refresh fails)
  const clearAccessToken = () => {
    if (typeof window !== 'undefined') {
      // Clear access_token from cookies
      Cookies.remove('access_token', { path: '/' });
      
      // Clear token expiry time
      localStorage.removeItem('token_expires_at');
      
      // Keep refresh_token for retry
    }
  };

  // Helper function to get token expiry time
  const getTokenExpiryTime = () => {
    if (typeof window !== 'undefined') {
      const expiryTime = localStorage.getItem('token_expires_at');
      return expiryTime ? parseInt(expiryTime) : null;
    }
    return null;
  };

  // Helper function to check if token is expired
  const isTokenExpired = () => {
    const expiryTime = getTokenExpiryTime();
    if (!expiryTime) return true;
    return Date.now() >= expiryTime;
  };

  // Helper function to get remaining time until token expires (in seconds)
  const getTokenTimeRemaining = () => {
    const expiryTime = getTokenExpiryTime();
    if (!expiryTime) return 0;
    const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
    return remaining;
  };

  // Helper function to get formatted time remaining (MM:SS)
  const getFormattedTimeRemaining = () => {
    const remaining = getTokenTimeRemaining();
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
 
  // 1. User Registration
  const register = async (name: string, email: string, password: string) => {
    
    // console.log('API_BASE_URL', API_BASE_URL);
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      
      if(response.ok){
        return {
          success: true,
          data: data
        };
      }else{
        return {
          success: false,
          error: data.detail || data.message || data.error || 'Registration failed'
        };
      }
    } catch {
      return {
        success: false,
        error: 'Network error, please try again'
      };
    }
  };

  // 2. User Login
  const login = async (email: string, password: string) => {
    // console.log('API_BASE_URL', API_BASE_URL);
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
      
      // Check if response is successful
      if (response.ok){
        setTokens(data.access_token, data.refresh_token, data.expires_in);
        return {
          success: true,
          data: data
        };
      }else{
        return {
          success: false,
          error: data.detail || data.message || data.error || 'Login failed'
        };
      }
      
      
    } catch {
      return {
        success: false,
        error: 'Network error, please try again'
      };
    }
  };

  // 3. Resend OTP
  const resendOtp = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // 4. Verify Reset OTP
  const verifyResetOtp = async (email: string, otp_code: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-reset-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp_code }),
      });
      const data = await response.json();
      if(response.ok){
        return {
          success: true,
          data: data
        };
      }else{
        return {
          success: false,
          error: data.detail || data.message || data.error || 'Verification failed'
        };
      }
    } catch (error) {
      throw error;
    }
  };

  // 5. Set New Password
  const setNewPassword = async (email: string, otp_code: string, new_password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/set-new-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp_code, new_password }),
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // 6. Change Password
  const changePassword = async (current_password: string, new_password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });

      const data = await response.json();
      console.log('data', data);
      if(response.ok){
        return {
          success: true,
          data: data
        };
      }else{
        return {
          success: false,
          error: data.detail || data.message || data.error || 'Change password failed'
        };
      }
    } catch (error) {
      throw error;
    }
  };


  // 8. Logout
  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      });
      const data = await response.json();
      if(response.ok){
        clearTokens();
        return {
          success: true,
          data: data
        }

        }else{
          return {
            success: false,
            error: data.detail || data.message || data.error || 'Logout failed'
          };
        }
       
      

    } catch (error) {
      // Still clear tokens even if API call fails
      throw error;
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        return { success: false, error: 'No refresh token available' };
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshTokenValue
        })
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        // Update only access token, keep the same refresh token
        setTokens(data.access_token, refreshTokenValue, data.expires_in);
        return { success: true, data };
      } else {
        // Refresh failed, but don't clear refresh token - it might still be valid
        // Only clear access token and expiry, keep refresh token
        clearAccessToken();
        return { 
          success: false, 
          error: data.detail || data.message || data.error || 'Token refresh failed' 
        };
      }
    } catch (error) {
      // Only clear access token and expiry, keep refresh token
      clearAccessToken();
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Token refresh failed' 
      };
    }
  };

  return {
    // Auth operations
    register,
    login,
    logout,
    
    // Password reset flow
    resendOtp,
    verifyResetOtp,
    setNewPassword,
    
    // Password management
    changePassword,
    getAuthToken,
    getRefreshToken,
    setTokens,
    clearTokens,
    // Token management
    refreshToken,
    clearAccessToken,

    // Helper functions
    getTokenExpiryTime,
    isTokenExpired,
    getTokenTimeRemaining,
    getFormattedTimeRemaining,
  };
}

export default AuthApi;
