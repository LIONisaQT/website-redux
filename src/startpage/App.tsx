import "./App.scss";
import BookmarksContainer from "./components/Bookmarks/BookmarksContainer";
import NameTime from "./components/Header/NameTime";

function App() {
  return (
    <>
      <div id="main">
        <NameTime />
        <BookmarksContainer />
      </div>
    </>
  );
}

export default App;
