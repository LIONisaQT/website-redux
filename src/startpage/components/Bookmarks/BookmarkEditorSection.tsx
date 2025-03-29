import "./BookmarkEditorSection.scss";
import { Bookmark } from "./custom-bookmark.interface";

interface Props {
  bookmark: Bookmark;
}

function BookmarkEditorSection({ bookmark }: Props) {
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
    </section>
  );
}

export default BookmarkEditorSection;
