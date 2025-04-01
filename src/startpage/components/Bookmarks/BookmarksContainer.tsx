import { BookmarkCollection } from "./custom-bookmark.interface";
import "./BookmarksContainer.scss";
import BookmarkSection from "./BookmarkSection";
import BookmarkEditor from "./BookmarkEditor";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

function BookmarksContainer() {
  const [editorOn, setEditorOn] = useState(false);
  const [currentCollection, setCollection] = useState<BookmarkCollection>();
  const bookmarks = useLiveQuery(() => db.bookmarks.toArray());

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

  const addBookmark = (name: string, url: string) => {
    console.log("Add bookmark", name, url);
  };

  return (
    <div className="bookmarks-container">
      {bookmarks?.map((collection) => (
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
        addCallback={addBookmark}
      />
    </div>
  );
}

export default BookmarksContainer;
