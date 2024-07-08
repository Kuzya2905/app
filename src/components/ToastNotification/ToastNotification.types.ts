export interface ToastNotificationTypes {
  message: string;
  onClose: () => void;
  status?: string;
}
