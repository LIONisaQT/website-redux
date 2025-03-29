import "./BookmarkEditor.scss";
import { useEffect, useState } from "react";
import { BookmarkCollection } from "./custom-bookmark.interface";
import BookmarkEditorSection from "./BookmarkEditorSection";

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
        <form action="" className="bookmark-editor">
          <h1 className="modal-title">Modify bookmark collection</h1>
          <section className="title-section">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              name="title"
              id="title-input"
              defaultValue={collection ? collection.name : "Collection name"}
              placeholder="Collection name (required)"
              required
            ></input>
          </section>
          <section className="bookmarks-section">
            {collection?.bookmarks.map((bookmark) => (
              <BookmarkEditorSection bookmark={bookmark} key={bookmark.name} />
            ))}
          </section>
          <section className="buttons">
            <button className="save-button">Save</button>
            <button className="cancel-button">Cancel</button>
          </section>
        </form>
      </div>
    )
  );
}

export default BookmarkEditor;
