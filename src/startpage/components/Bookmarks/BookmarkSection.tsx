import { BookmarkCollection } from "./custom-bookmark.interface";
import "./BookmarkSection.scss";

interface Props {
  collection: BookmarkCollection;
  callback: (collection: BookmarkCollection) => void;
}

function BookmarkSection({ collection, callback }: Props) {
  const getData = () => {
    callback(collection);
  };

  return (
    <div className="bookmark-section">
      <div className="title-area">
        <div className="collection-name">{collection.name}</div>
        <button className="edit-bookmark" onClick={getData}>
          edit
        </button>
      </div>
      <ul>
        {collection.bookmarks.map((bookmark) => (
          <li key={bookmark.name}>
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
