import { Converter } from 'showdown';
import xssFilter from 'showdown-xss-filter';

export default new Converter({
  tables: true,
  noHeaderId: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: [xssFilter],
});
