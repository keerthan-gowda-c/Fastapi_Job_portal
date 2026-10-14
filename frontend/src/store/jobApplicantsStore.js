import { create } from "zustand";
import api from "../api/axios";

const useJobApplicantsStore = create((set, get) => ({
    applicationsByJob: {},
    loadingByJob: {},
    hasFetchedByJobs: {},
    requestsByJob: {},

    fetchApplicants: async (jobId, force = false) => {
        const key = String(jobId);
        const state = get();

        if (!force && state.hasFetchedByJobs[key]) {
            return state.applicationsByJob[key];
        }
        if (state.requestsByJob[key]) {
            return state.requestsByJob[key];
        }

        const request = (async () => {
            set((state) => ({
                loadingByJob: {
                    ...state.loadingByJob,
                    [key]: true,
                },
            }));

            try {
                const response = await api.get(`/applications/job/${key}`);
                set((state) => ({
                    applicationsByJob: {
                        ...state.applicationsByJob,
                        [key]: response.data,
                    },
                }));
                return response.data
            } finally {
                set((state) => {
                    const requests = { ...state.requestsByJob };
                    delete requests[key];

                    return {
                        loadingByJob: {
                            ...state.loadingByJob,
                            [key]: false,
                        },
                        requestsByJob: requests,
                    };
                });
            }
        })();

        set((state) => ({
            requestsByJob: {
                ...state.requestsByJob,
                [key]: request,
            },
        }));
        return request;
    },

    updateApplicationStatus: (jobId, applicationId, status) => {
        const key = String(jobId);
        set((state) => ({
            applicationsByJob: {
                ...state.applicationsByJob,
                [key]: (state.applicationsByJob[key] || []).map((application) => application.id === applicationId ? { ...application, status } : application),
            },
        }));
    },

    invalidateApplicants: (jobId) => {
        const key = String(jobId);

        set((state) => ({
            hasFetchedByJobs: {
                ...state.hasFetchedByJobs,
                [key]: false,
            },
        }));
    },

    clearApplicants: () => {
        set({
            applicationsByJob: {},
            loadingByJob: {},
            hasFetchedByJobs: {},
            requestsByJob: {},
        });
    },
}));

export default useJobApplicantsStore;