import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'posts.db', location: 'default' });

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, synced INTEGER)',
      [],
    );
  });
};

export const insertPost = (content, synced = 0) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO posts (content, synced) VALUES (?, ?)', [content, synced]);
  });
};

export const fetchPostsFromDB = () => {
  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM posts ORDER BY id DESC', [], (_, results) => {
        const rows = results.rows;
        const posts = [];

        for (let i = 0; i < rows.length; i++) {
          posts.push(rows.item(i));
        }

        resolve(posts);
      });
    });
  });
};

export const getUnsyncedPosts = () => {
  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM posts WHERE synced = 0', [], (_, results) => {
        const posts = [];
        for (let i = 0; i < results.rows.length; i++) {
          posts.push(results.rows.item(i));
        }
        resolve(posts);
      });
    });
  });
};

export const markPostAsSynced = (id) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE posts SET synced = 1 WHERE id = ?', [id]);
  });
};
