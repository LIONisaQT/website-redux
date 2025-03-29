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
    console.log(`Editor open: ${editorOn}`);
    console.log(currentCollection);
  }, [editorOn, currentCollection]);

  const toggleEditorActions = (
    collection?: BookmarkCollection,
    wasSaved?: boolean
  ) => {
    setEditorOn(!editorOn);
    setCollection(collection);

    if (wasSaved) {
      saveCollection();
    }
  };

  const saveCollection = () => {
    console.log(`${currentCollection?.name} saved`);
  };

  return (
    <div className="bookmarks-container">
      {defaultBookmarks.map((collection) => (
        <BookmarkSection
          collection={collection}
          editClickCallback={toggleEditorActions}
          key={collection.name}
        />
      ))}
      <BookmarkEditor
        visible={editorOn}
        collection={currentCollection}
        closeCallback={(wasSaved: boolean, collection?: BookmarkCollection) =>
          toggleEditorActions(collection, wasSaved)
        }
      />
    </div>
  );
}

export default BookmarksContainer;
