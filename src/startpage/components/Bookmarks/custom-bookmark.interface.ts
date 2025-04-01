export interface BookmarkCollection {
  name: string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  name: string;
  url: string;
}

export const defaultBookmarks: BookmarkCollection[] = [
  {
    name: "0: Comms",
    bookmarks: [
      {
        name: "Gmail",
        url: "https://mail.google.com/mail/u/0/",
      },
      {
        name: "Facebook Messenger",
        url: "https://www.messenger.com",
      },
      {
        name: "Google Messages",
        url: "https://messages.google.com/web/u/1/conversations",
      },
    ],
  },
  {
    name: "1: Entertainment",
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
    name: "2: Study",
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
    name: "3: Utility",
    bookmarks: [
      {
        name: "Drive",
        url: "https://drive.google.com",
      },
      {
        name: "Photos",
        url: "https://photos.google.com/u/0/",
      },
      {
        name: "Jisho",
        url: "https://jisho.org",
      },
    ],
  },
];
