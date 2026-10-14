import { create } from "zustand";
import api from "../api/axios";


const useRecruiterApplicationsStore = create((set, get) => ({
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
                const response = await api.get("/applications");
                const jobMap = {};

                response.data.forEach((application) => {
                    const jobId = application.job.id;

                    if (!jobMap[jobId]) {
                        jobMap[jobId] = {
                            job: application.job,
                            applicants: 0,
                        };
                    }

                    jobMap[jobId].applicants += 1;
                });

                const applications = Object.values(jobMap);

                set({
                    applications,
                    hasFetched: true,
                    error: null,
                });

                return applications;
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

export default useRecruiterApplicationsStore;