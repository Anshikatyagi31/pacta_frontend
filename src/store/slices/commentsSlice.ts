import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commentAPI, type CommentQuery, type CreateCommentData, type UpdateCommentData } from '../../api/comments';
import type { Comment } from '../../types';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchCommentsByProject = createAsyncThunk(
  'comments/fetchCommentsByProject',
  async ({ projectId, query = {} }: { projectId: string; query?: CommentQuery }, { rejectWithValue }) => {
    try {
      const response = await commentAPI.getCommentsByProject(projectId, query);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch comments');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch comments');
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (data: CreateCommentData, { rejectWithValue }) => {
    try {
      const response = await commentAPI.createComment(data);
      if (response.success) {
        return response.data.comment;
      }
      throw new Error(response.message || 'Failed to create comment');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to create comment');
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ id, data }: { id: string; data: UpdateCommentData }, { rejectWithValue }) => {
    try {
      const response = await commentAPI.updateComment(id, data);
      if (response.success) {
        return response.data.comment;
      }
      throw new Error(response.message || 'Failed to update comment');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await commentAPI.deleteComment(id);
      if (response.success) {
        return id;
      }
      throw new Error(response.message || 'Failed to delete comment');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to delete comment');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearComments: (state) => {
      state.comments = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments by Project
      .addCase(fetchCommentsByProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload.comments;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchCommentsByProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Comment
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.unshift(action.payload);
        state.error = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Comment
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.comments.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Comment
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = state.comments.filter(c => c.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
