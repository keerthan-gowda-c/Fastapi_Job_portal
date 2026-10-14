
import { create } from "zustand";
import api from "../api/axios";

const useRecruiterDashboardStore = create((set, get) => ({
    stats: null,
    loading: false,
    error: null,
    hasFetched: false,

    fetchDashboard: async (force = false) => {
        const state = get();

        if (!force && state.hasFetched) {
            return state.stats;
        }

        if (state.loading) {
            return;
        }

        set({ loading: true, error: null });

        try {
            const response = await api.get("/dashboard/recruiter");

            set({
                stats: response.data,
                hasFetched: true,
                error: null,
            });

            return response.data;
        } catch (error) {
            set({
                error:
                    error.response?.data?.detail ||
                    "Failed to load recruiter dashboard",
            });

            throw error;
        } finally {
            set({ loading: false });
        }
    },

    invalidateDashboard: () => {
        set({ hasFetched: false });
    },

    clearDashboard: () => {
        set({
            stats: null,
            loading: false,
            error: null,
            hasFetched: false,
        });
    },
}));

export default useRecruiterDashboardStore;
