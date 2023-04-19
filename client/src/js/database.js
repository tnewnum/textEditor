import { openDB } from 'idb';

const dataBase = 'jate';


const upgradeDb = (db) => {
  if (db.objectStoreNames.contains(dataBase)) {
    console.log(`${dataBase} database already exists`);
    return;
  }
  db.createObjectStore(dataBase, { keyPath: 'id', autoIncrement: true });
  console.log(`${dataBase} database created`);
};


const initdb = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains('jate')) {
          console.log('jate database already exists');
          return;
        }
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      },
    });
    console.log('Database opened successfully');
    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw error;
  }
};

// Add content to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction(dataBase, 'readwrite');
    const store = tx.objectStore(dataBase);
    const request = store.put({ id: 1, jate: content });
    const result = await request;
    console.log('saved to the database', result);
    return result;
  } catch (error) {
    console.error('Failed to add content to the database:', error);
    throw error;
  }
};

// Get all content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log(result);
    return result;
  } catch (error) {
    console.error('Failed to get content from the database:', error);
    throw error;
  }
};

initdb();


