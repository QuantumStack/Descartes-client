import { notification, modal } from 'uikit';

export const
  success = text => notification(text, { status: 'success' }),
  error = text => modal.alert(`Uh-oh, something went wrong: ${text}`);
