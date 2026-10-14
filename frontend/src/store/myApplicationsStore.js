import { create } from "zustand";
import api from "../api/axios";

const useMyApplicationsStore = create((set, get) => ({
    applications: [],
    loading: false,
    error: null,
    hasFetched: false,
    request: null,

    fetchApplications: async (force = false) => {
        const state = get();

        if (!force && state.hasFetched) {
            return state.applications;
        }

        if (state.request) {
            return state.request;
        }

        const request = (async () => {
            set({ loading: true, error: null });

            try {
                const response = await api.get("/applications/me");

                set({
                    applications: response.data,
                    hasFetched: true,
                    error: null,
                });

                return response.data;
            } catch (error) {
                set({
                    error:
                        error.response?.data?.detail ||
                        "Failed to load applications",
                });

                throw error;
            } finally {
                set({ loading: false, request: null });
            }
        })();

        set({ request });

        return request;
    },

    updateApplication: (applicationId, updates) => {
        set((state) => ({
            applications: state.applications.map((application) =>
                application.id === applicationId
                    ? { ...application, ...updates }
                    : application
            ),
        }));
    },

    removeApplication: (applicationId) => {
        set((state) => ({
            applications: state.applications.filter(
                (application) => application.id !== applicationId
            ),
        }));
    },

    invalidateApplications: () => {
        set({ hasFetched: false });
    },

    clearApplications: () => {
        set({
            applications: [],
            loading: false,
            error: null,
            hasFetched: false,
            request: null,
        });
    },
}));

export default useMyApplicationsStore;
