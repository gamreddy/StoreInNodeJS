import { app } from './app.js';
import createDebugMessages from 'debug';
const debug  = createDebugMessages("server.js");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`Store is running on port ${port}`);
})