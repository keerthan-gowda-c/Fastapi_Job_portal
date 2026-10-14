import { create } from "zustand";
import api from "../api/axios";

const useSavedJobsStore = create((set, get) => ({
    savedJobs: [],
    loading: false,
    error: null,
    hasFetched: false,
    request: null,

    fetchSavedJobs: async (force = false) => {
        const state = get();

        if (!force && state.hasFetched) {
            return state.savedJobs;
        }

        if (state.request) {
            return state.request;
        }

        const request = (async () => {
            set({ loading: true, error: null });

            try {
                const response = await api.get("/saved-jobs");

                set({
                    savedJobs: response.data,
                    hasFetched: true,
                    error: null,
                });

                return response.data;
            } catch (error) {
                set({
                    error:
                        error.response?.data?.detail ||
                        "Failed to load saved jobs",
                });

                throw error;
            } finally {
                set({ loading: false, request: null });
            }
        })();

        set({ request });

        return request;
    },

    removeSavedJobFromCache: (jobId) => {
        set((state) => ({
            savedJobs: state.savedJobs.filter(
                (savedJob) =>
                    String(savedJob.job.id) !== String(jobId)
            ),
        }));
    },

    invalidateSavedJobs: () => {
        set({ hasFetched: false });
    },

    clearSavedJobs: () => {
        set({
            savedJobs: [],
            loading: false,
            error: null,
            hasFetched: false,
            request: null,
        });
    },
}));

export default useSavedJobsStore;
