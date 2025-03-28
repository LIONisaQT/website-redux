import {
  BookmarkCollection,
  defaultBookmarks,
} from "./custom-bookmark.interface";
import "./BookmarksContainer.scss";
import BookmarkSection from "./BookmarkSection";
import BookmarkEditor from "./BookmarkEditor";
import { useEffect, useState } from "react";

function BookmarksContainer() {
  const [editorOn, setEditorOn] = useState(false);
  const [currentCollection, setCollection] = useState<BookmarkCollection>();

  useEffect(() => {
    console.log(editorOn);
    console.log(currentCollection);
  }, [editorOn, currentCollection]);

  const toggleEditor = (collection?: BookmarkCollection) => {
    setEditorOn(!editorOn);
    setCollection(collection);
  };

  return (
    <div className="bookmarks-container">
      {defaultBookmarks.map((collection) => (
        <BookmarkSection collection={collection} callback={toggleEditor} />
      ))}
      <BookmarkEditor visible={editorOn} collection={currentCollection} />
    </div>
  );
}

export default BookmarksContainer;
