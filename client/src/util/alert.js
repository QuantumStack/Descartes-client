import { notification, modal } from 'uikit';

export const success = text => notification(text, { status: 'success', timeout: 5000 });

export const error = (text, res = {}) => modal.alert(`Uh-oh, something went wrong: ${text || res.statusText || '¯\\\_(ツ)_/¯'}`);
