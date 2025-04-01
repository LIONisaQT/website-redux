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
    wasSaved?: boolean,
    newTitle?: string
  ) => {
    setEditorOn(!editorOn);
    setCollection(collection);

    if (wasSaved && newTitle) {
      saveCollection(newTitle);
    }
  };

  // TODO: Maybe use ID instead of bookmark name as key? Collections get rendered alphanumerically.
  const saveCollection = (name: string) => {
    db.bookmarks.update(currentCollection!.name, { name: name });
    // .then((updated) => console.log(updated));
  };

  const addBookmark = (name: string, url: string) => {
    currentCollection!.bookmarks.push({ name, url });

    db.bookmarks.update(currentCollection!.name, {
      bookmarks: currentCollection!.bookmarks,
    });
    // .then((updated) => {
    //   console.log(updated);
    // });
  };

  const deleteBookmark = (name: string) => {
    const filtered = currentCollection!.bookmarks.filter(
      (bookmark) => bookmark.name !== name
    );

    const updated: BookmarkCollection = {
      name: currentCollection!.name,
      bookmarks: filtered,
    };

    setCollection(updated);

    db.bookmarks.update(currentCollection!.name, {
      bookmarks: filtered,
    });
    // .then((updated) => {
    //   console.log(updated);
    // });
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
        closeCallback={(
          wasSaved: boolean,
          collection?: BookmarkCollection,
          newTitle?: string
        ) => toggleEditorActions(collection, wasSaved, newTitle)}
        addCallback={addBookmark}
        deleteCallback={deleteBookmark}
      />
    </div>
  );
}

export default BookmarksContainer;
