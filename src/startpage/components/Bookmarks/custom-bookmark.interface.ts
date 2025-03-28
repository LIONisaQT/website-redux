export interface BookmarkCollection {
  name: string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  name: string;
  url: string;
}
