import { populate, start } from "./crawler/crawler";
import index from "./indexer";

export function register() {
    console.log("SLDkfj");
    if (process.env.NODE_ENV !== "production") {
        // if (false) {
        (async () => {
            // await populate();
            await start();
            await index();
        })();
    }
}
