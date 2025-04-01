import "./BookmarkEditorSection.scss";
import { Bookmark } from "./custom-bookmark.interface";

interface Props {
  bookmark: Bookmark;
  deleteCallback: (name: string) => void;
}

function BookmarkEditorSection({ bookmark, deleteCallback }: Props) {
  return (
    <section className="editor-section">
      <div className="label-input">
        <label htmlFor="bookmark-name">Label</label>
        <input
          type="text"
          name="bookmark-name"
          defaultValue={bookmark.name}
          placeholder="Bookmark label (required)"
          required
        />
      </div>
      <div className="label-input">
        <label htmlFor="bookmark-url">URL</label>
        <input
          type="text"
          defaultValue={bookmark.url}
          placeholder="Bookmark URL (required)"
          required
        />
      </div>
      <button type="button" onClick={() => deleteCallback(bookmark.name)}>
        🗑️
      </button>
    </section>
  );
}

export default BookmarkEditorSection;
