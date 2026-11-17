import { config } from './config/env.config.js'; 

import app from './app.js';

const port = config.PORT;

app.listen(port, () => {
    console.log(`Server started on port ${port}, Bienvenidos a ${config.APP_NAME}`);
});


