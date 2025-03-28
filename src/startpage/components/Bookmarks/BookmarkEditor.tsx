import "./BookmarkEditor.scss";
import { useEffect, useState } from "react";
import { BookmarkCollection } from "./custom-bookmark.interface";

interface Props {
  visible: boolean;
  collection?: BookmarkCollection;
}

function BookmarkEditor({ visible, collection }: Props) {
  const [isOn, setOn] = useState(false);

  useEffect(() => {
    setOn(visible);
  }, [visible]);

  return (
    isOn && (
      <div className="editor-container">
        <div className="bookmark-editor">
          <section className="title-section">
            <div>{collection?.name}</div>
          </section>
          {collection?.bookmarks.map((bookmark) => (
            <section key={bookmark.name}>{bookmark.name}</section>
          ))}
        </div>
      </div>
    )
  );
}

export default BookmarkEditor;
