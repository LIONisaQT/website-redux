import "./BookmarkSection.scss";
import { BookmarkCollection } from "./Bookmark.interface";

function BookmarkSection(collection: BookmarkCollection) {
  return (
    <div className="bookmark-section">
      <div>{collection.name}</div>
      <ul>
        {collection.bookmarks.map((bookmark) => (
          <li>
            <a href={bookmark.url}>{bookmark.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarkSection;
