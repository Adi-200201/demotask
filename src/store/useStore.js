  import { create } from 'zustand';
import { fetchPostsFromDB } from '../services/db'; // Optional if unused

  export const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user } || ''),

    posts: [],
    setPosts: (posts) => set({ posts }),

    fetchLocalPosts: async () => {
      const posts = await fetchPostsFromDB();
      set({ posts });
    },

    addPost: (post) =>
      set((state) => ({
        posts: [post, ...state.posts],
      })),
  }));
