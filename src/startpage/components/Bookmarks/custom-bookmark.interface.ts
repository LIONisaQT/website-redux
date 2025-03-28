export interface BookmarkCollection {
  name: string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  name: string;
  url: string;
}

// TODO: Read this and move to localStorage on first launch
export const defaultBookmarks: BookmarkCollection[] = [
  {
    name: "Google",
    bookmarks: [
      {
        name: "ryan@ryanshee.com",
        url: "https://mail.google.com/mail/u/1/",
      },
      {
        name: "ryan.shee@gmail.com",
        url: "https://mail.google.com/mail/u/0/",
      },
      {
        name: "Drive",
        url: "https://drive.google.com",
      },
      {
        name: "Photos",
        url: "https://photos.google.com/u/0/",
      },
    ],
  },
  {
    name: "Entertainment",
    bookmarks: [
      {
        name: "Reddit",
        url: "https://reddit.com",
      },
      {
        name: "YouTube",
        url: "https://youtube.com",
      },
      {
        name: "Netflix",
        url: "https://netflix.com",
      },
      {
        name: "Anime",
        url: "https://hianime.to/",
      },
    ],
  },
  {
    name: "Work ",
    bookmarks: [
      {
        name: "GitHub",
        url: "https://github.com",
      },
      {
        name: "Grind 75",
        url: "https://www.techinterviewhandbook.org/grind75/",
      },
      {
        name: "LeetCode",
        url: "https://leetcode.com/",
      },
      {
        name: "myRAM",
        url: "https://ramid.ccsf.edu/_layouts/PG/login.aspx?ReturnUrl=%2fsso%2fdefault.aspx",
      },
    ],
  },
  {
    name: "Utility",
    bookmarks: [
      {
        name: "Jisho",
        url: "https://jisho.org",
      },
    ],
  },
];
