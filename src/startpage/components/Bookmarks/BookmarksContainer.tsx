import "./BookmarksContainer.scss";
import BookmarkSection from "./BookmarkSection";

function BookmarksContainer() {
  return (
    <div className="bookmarks-container">
      <BookmarkSection />
      <BookmarkSection />
      <BookmarkSection />
      <BookmarkSection />
    </div>
  );
}

export default BookmarksContainer;
