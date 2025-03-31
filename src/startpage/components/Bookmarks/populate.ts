import { defaultBookmarks } from "./custom-bookmark.interface";
import { db } from "./db";

export async function populate() {
  try {
    for (const collection of defaultBookmarks) {
      const add = await db.bookmarks.add(collection);
      console.log(add);
    }
  } catch (e) {
    console.error(e);
  }
}
