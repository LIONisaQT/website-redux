import { BookmarkCollection } from "./Bookmark.interface";
import "./BookmarkSection.scss";

function BookmarkSection(collection: BookmarkCollection) {
  return (
    <div className="bookmark-section">
      <div className="collection-name">{collection.name}</div>
      <ul>
        {collection.bookmarks.map((bookmark) => (
          <li>
            <a href={bookmark.url} target="_self">
              {bookmark.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarkSection;
