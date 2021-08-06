export interface INotificationContext {
    error: boolean;
    messages: string;
    setNotification: (error: boolean, messages: string) => void;
}
