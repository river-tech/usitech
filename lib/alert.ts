/**
 * Global alert/toast functions
 * 
 * Usage:
 * import { showAlert, showSuccess, showError, showWarning, showInfo } from '@/lib/alert';
 * 
 * showAlert("This is an info message");
 * showSuccess("Operation successful!");
 * showError("Something went wrong");
 * showWarning("Please check your input");
 * showInfo("New notification received");
 */

export { showAlert, showSuccess, showError, showWarning, showInfo } from './contexts/ToastContext';
export type { ToastType } from './contexts/ToastContext';

