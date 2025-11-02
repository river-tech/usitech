"use client";

import { useToast } from '../contexts/ToastContext';

export function useAlert() {
  const toast = useToast();
  
  return {
    showAlert: toast.showToast,
    showSuccess: toast.showSuccess,
    showError: toast.showError,
    showWarning: toast.showWarning,
    showInfo: toast.showInfo,
  };
}

// Export global functions that will work after ToastProvider is mounted
export { showAlert, showSuccess, showError, showWarning, showInfo } from '../contexts/ToastContext';

