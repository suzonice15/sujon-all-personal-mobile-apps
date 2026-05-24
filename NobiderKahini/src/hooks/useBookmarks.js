import { useState, useEffect, useCallback } from 'react';
import * as db from '../utils/db';

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  const load = useCallback(async () => {
    const data = await db.getAllBookmarks();
    setBookmarks(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = useCallback(async (story, prophetName) => {
    const exists = await db.isBookmarked(story.id, prophetName);
    if (exists) {
      await db.removeBookmark(story.id, prophetName);
    } else {
      await db.addBookmark(story, prophetName);
    }
    load();
  }, [load]);

  const checkBookmarked = useCallback(async (storyId, prophetName) => {
    return await db.isBookmarked(storyId, prophetName);
  }, []);

  const addTag = useCallback(async (storyId, prophetName, tag) => {
    await db.addTag(storyId, prophetName, tag);
    load();
  }, [load]);

  const removeTag = useCallback(async (storyId, prophetName, tag) => {
    await db.removeTag(storyId, prophetName, tag);
    load();
  }, [load]);

  return { bookmarks, toggle, checkBookmarked, addTag, removeTag, reload: load };
}
