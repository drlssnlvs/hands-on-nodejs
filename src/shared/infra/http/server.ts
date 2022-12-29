require("dotenv").config();

import { App } from "./app";
import { Application } from "express";
import signale from "signale";

new App()
  .setup()
  .then((app: Application) => {
    const PORT = process.env.PORT;

    app.listen(PORT, () => signale.star(`app on port ${PORT}`));
  })
  .catch((err: Error) =>
    signale.warn(`error to start app ${JSON.stringify(err)}`)
  );
