import Dexie, { type EntityTable } from "dexie";
import { BookmarkCollection } from "./custom-bookmark.interface";
import { populate } from "./populate";

const db = new Dexie("BookmarksDatabase") as Dexie & {
  bookmarks: EntityTable<BookmarkCollection, "name">;
};

db.version(1).stores({
  bookmarks: "++name",
});

db.on("ready", async () => {
  const count = await db.bookmarks.count();
  if (count !== 0) return;
  populate();
});

export { db };
