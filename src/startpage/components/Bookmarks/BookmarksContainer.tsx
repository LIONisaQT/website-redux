import { defaultBookmarks } from "./custom-bookmark.interface";
import "./BookmarksContainer.scss";
import BookmarkSection from "./BookmarkSection";

function BookmarksContainer() {
  return (
    <div className="bookmarks-container">
      {defaultBookmarks.map((collection) => (
        <BookmarkSection {...collection} />
      ))}
    </div>
  );
}

export default BookmarksContainer;
