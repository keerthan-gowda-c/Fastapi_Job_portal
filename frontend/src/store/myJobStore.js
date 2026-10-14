
import { create } from "zustand";
import api from "../api/axios";

const useMyJobStore = create((set, get) => ({
    jobs: [],
    loading: false,
    error: null,
    hasFetched: false,
    request: null,

    fetchJobs: async (force = false) => {
        const state = get();

        if (!force && state.hasFetched) {
            return state.jobs;
        }

        if (state.request) {
            return state.request;
        }

        const request = (async () => {
            set({ loading: true, error: null });

            try {
                const response = await api.get("/jobs/my-jobs");

                set({
                    jobs: Array.isArray(response.data)
                        ? response.data
                        : [],
                    hasFetched: true,
                    error: null,
                });

                return response.data;
            } catch (error) {
                set({
                    error:
                        error.response?.data?.detail ||
                        "Failed to load jobs",
                });

                throw error;
            } finally {
                set({ loading: false, request: null });
            }
        })();

        set({ request });

        return request;
    },

    removeJobs: (id) => {
        set((state) => ({
            jobs: state.jobs.filter((job) => job.id !== id),
        }));
    },

    invalidateJobs: () => {
        set({ hasFetched: false });
    },

    clearJobs: () => {
        set({
            jobs: [],
            loading: false,
            error: null,
            hasFetched: false,
            request: null,
        });
    },
}));

export default useMyJobStore;
