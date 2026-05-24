import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@nobider/bookmarks';

async function readBookmarks() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

async function writeBookmarks(bookmarks) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export async function addBookmark(story, prophetName) {
  const bookmarks = await readBookmarks();
  const key = `${story.id}_${prophetName}`;
  if (!bookmarks.some(item => item.key === key)) {
    bookmarks.push({
      key,
      id: story.id,
      prophetName,
      title: story.title,
      details: story.details,
      tags: [],
    });
    await writeBookmarks(bookmarks);
  }
}

export async function removeBookmark(storyId, prophetName) {
  const bookmarks = await readBookmarks();
  const filtered = bookmarks.filter(item => item.id !== storyId || item.prophetName !== prophetName);
  await writeBookmarks(filtered);
}

export async function isBookmarked(storyId, prophetName) {
  const bookmarks = await readBookmarks();
  return bookmarks.some(item => item.id === storyId && item.prophetName === prophetName);
}

export async function getAllBookmarks() {
  return await readBookmarks();
}

export async function addTag(storyId, prophetName, tag) {
  const bookmarks = await readBookmarks();
  const index = bookmarks.findIndex(item => item.id === storyId && item.prophetName === prophetName);
  if (index === -1) return;

  const tags = bookmarks[index].tags || [];
  if (!tags.includes(tag)) {
    bookmarks[index] = { ...bookmarks[index], tags: [...tags, tag] };
    await writeBookmarks(bookmarks);
  }
}

export async function removeTag(storyId, prophetName, tag) {
  const bookmarks = await readBookmarks();
  const index = bookmarks.findIndex(item => item.id === storyId && item.prophetName === prophetName);
  if (index === -1) return;

  const tags = (bookmarks[index].tags || []).filter(t => t !== tag);
  bookmarks[index] = { ...bookmarks[index], tags };
  await writeBookmarks(bookmarks);
}
