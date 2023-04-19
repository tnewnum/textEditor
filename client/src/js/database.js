import { openDB } from 'idb';

const dataBase= 'jate'

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>  {
  const contactDb = await openDB(dataBase, 1);
  const tx = contactDb.transaction(dataBase, 'readwrite');
  const store = tx.objectStore(dataBase)
  const request = store.add({id: 1, jate: content})
  
  const result = await request;
  console.log('saved to the database', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDb = await openDB(dataBase, 1)
  const tx = contactDb.transaction(dataBase, 'readonly')
  const store = tx.objectStore(dataBase)
  const request = store.getAll();

  const result = await request;
  console.log(result);
  return result

};

initdb();
