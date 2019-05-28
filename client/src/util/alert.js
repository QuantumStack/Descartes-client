import { notification, modal } from 'uikit';

export const
  success = text => notification(text, { status: 'success', timeout: 5000 }),
  error = text => modal.alert(`Uh-oh, something went wrong: ${text}`);
