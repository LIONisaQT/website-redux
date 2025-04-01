import "./BookmarkEditor.scss";
import { BookmarkCollection } from "./custom-bookmark.interface";
import BookmarkEditorSection from "./BookmarkEditorSection";
import { useState } from "react";

interface Props {
  visible: boolean;
  collection?: BookmarkCollection;
  closeCallback: (wasSaved: boolean, collection?: BookmarkCollection) => void;
  addCallback: (name: string, url: string) => void;
}

function BookmarkEditor({
  visible,
  collection,
  closeCallback,
  addCallback,
}: Props) {
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  return (
    visible && (
      <div className="editor-container">
        <form className="bookmark-editor">
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
          <section className="add-bookmark">
            <div className="add-title">
              <h3>Add new</h3>
            </div>
            <div className="add-input">
              <div className="label-input">
                <label htmlFor="bookmark-name">Label</label>
                <input
                  type="text"
                  name="bookmark-name"
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Bookmark label (required)"
                  required
                />
              </div>
              <div className="label-input">
                <label htmlFor="bookmark-url">URL</label>
                <input
                  type="text"
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Bookmark URL (required)"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => addCallback(newName, newUrl)}
              >
                ➕
              </button>
            </div>
          </section>
          <section className="buttons">
            <button
              className="save-button"
              onClick={() => closeCallback(true, collection)}
            >
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => closeCallback(false, undefined)}
            >
              Cancel
            </button>
          </section>
        </form>
      </div>
    )
  );
}

export default BookmarkEditor;
