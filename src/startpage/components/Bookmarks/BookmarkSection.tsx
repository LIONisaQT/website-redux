import { BookmarkCollection } from "./custom-bookmark.interface";
import "./BookmarkSection.scss";

function BookmarkSection(collection: BookmarkCollection) {
  return (
    <div className="bookmark-section">
      <div className="title-area">
        <div className="collection-name">{collection.name}</div>
        <button className="edit-bookmark">edit</button>
      </div>
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
