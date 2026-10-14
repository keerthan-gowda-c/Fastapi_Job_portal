import { create } from "zustand";
import api from "../api/axios";

export const getJobsCacheKey = (params) =>
    JSON.stringify({
        page: params.page,
        limit: params.limit,
        keyword: params.keyword || "",
        location: params.location || "",
        salary: params.salary ?? "",
    });

const useJobStore = create((set, get) => ({
    jobsCache: {},
    loadingKeys: {},
    errorKeys: {},
    jobsRequests: {},
    jobsVersion: 0,

    fetchJobs: async (params, force = false) => {
        const key = getJobsCacheKey(params);
        const state = get();

        if (!force && state.jobsCache[key] !== undefined) {
            return state.jobsCache[key];
        }

        if (state.jobsRequests[key]) {
            return state.jobsRequests[key];
        }

        const version = state.jobsVersion;

        const request = (async () => {
            set((state) => ({
                loadingKeys: {
                    ...state.loadingKeys,
                    [key]: true,
                },
                errorKeys: {
                    ...state.errorKeys,
                    [key]: null,
                },
            }));

            try {
                const response = await api.get("/jobs", { params });

                if (get().jobsVersion === version) {
                    set((state) => ({
                        jobsCache: {
                            ...state.jobsCache,
                            [key]: response.data,
                        },
                    }));
                }

                return response.data;
            } catch (error) {
                if (get().jobsVersion === version) {
                    set((state) => ({
                        errorKeys: {
                            ...state.errorKeys,
                            [key]:
                                error.response?.data?.detail ||
                                "Failed to load jobs",
                        },
                    }));
                }

                throw error;
            } finally {
                if (get().jobsRequests[key] === request) {
                    set((state) => {
                        const requests = { ...state.jobsRequests };
                        const loading = { ...state.loadingKeys };

                        delete requests[key];
                        loading[key] = false;

                        return {
                            jobsRequests: requests,
                            loadingKeys: loading,
                        };
                    });
                }
            }
        })();

        set((state) => ({
            jobsRequests: {
                ...state.jobsRequests,
                [key]: request,
            },
        }));

        return request;
    },

    invalidateJobs: () =>
        set((state) => ({
            jobsCache: {},
            errorKeys: {},
            jobsVersion: state.jobsVersion + 1,
            jobsRequests: {},
            loadingKeys: {},
        })),

    userJobStatus: {},
    statusLoading: {},
    statusRequests: {},
    statusVersions: {},

    fetchUserJobStatus: async (userId, force = false) => {
        if (userId == null) return;

        const key = String(userId);
        const state = get();

        if (
            !force &&
            state.userJobStatus[key] !== undefined
        ) {
            return state.userJobStatus[key];
        }

        if (state.statusRequests[key]) {
            return state.statusRequests[key];
        }

        const version = state.statusVersions[key] ?? 0;

        const request = (async () => {
            set((state) => ({
                statusLoading: {
                    ...state.statusLoading,
                    [key]: true,
                },
            }));

            try {
                const [
                    applicationsResponse,
                    savedResponse,
                ] = await Promise.all([
                    api.get("/applications/me"),
                    api.get("/saved-jobs/"),
                ]);

                const appliedIds =
                    applicationsResponse.data.map(
                        (application) => application.job.id
                    );

                const savedIds =
                    savedResponse.data.map(
                        (savedJob) => savedJob.job.id
                    );

                const status = { appliedIds, savedIds };

                if (
                    (get().statusVersions[key] ?? 0) === version
                ) {
                    set((state) => ({
                        userJobStatus: {
                            ...state.userJobStatus,
                            [key]: status,
                        },
                    }));
                }

                return status;
            } finally {
                if (get().statusRequests[key] === request) {
                    set((state) => {
                        const requests = {
                            ...state.statusRequests,
                        };
                        const loading = {
                            ...state.statusLoading,
                        };

                        delete requests[key];
                        loading[key] = false;

                        return {
                            statusRequests: requests,
                            statusLoading: loading,
                        };
                    });
                }
            }
        })();

        set((state) => ({
            statusRequests: {
                ...state.statusRequests,
                [key]: request,
            },
        }));

        return request;
    },

    markJobApplied: (userId, jobId) => {
        if (userId == null) return;

        const key = String(userId);

        set((state) => {
            const current = state.userJobStatus[key];

            if (!current) return {};

            return {
                userJobStatus: {
                    ...state.userJobStatus,
                    [key]: {
                        ...current,
                        appliedIds: current.appliedIds.includes(jobId)
                            ? current.appliedIds
                            : [...current.appliedIds, jobId],
                    },
                },
            };
        });
    },

    markJobSaved: (userId, jobId) => {
        if (userId == null) return;

        const key = String(userId);

        set((state) => {
            const current = state.userJobStatus[key];

            if (!current) return {};

            return {
                userJobStatus: {
                    ...state.userJobStatus,
                    [key]: {
                        ...current,
                        savedIds: current.savedIds.includes(jobId)
                            ? current.savedIds
                            : [...current.savedIds, jobId],
                    },
                },
            };
        });
    },

    clearUserJobStatus: (userId) => {
        if (userId == null) return;

        const key = String(userId);

        set((state) => {
            const userJobStatus = {
                ...state.userJobStatus,
            };
            const statusLoading = {
                ...state.statusLoading,
            };
            const statusRequests = {
                ...state.statusRequests,
            };

            delete userJobStatus[key];
            delete statusLoading[key];
            delete statusRequests[key];

            return {
                userJobStatus,
                statusLoading,
                statusRequests,
                statusVersions: {
                    ...state.statusVersions,
                    [key]: (state.statusVersions[key] ?? 0) + 1,
                },
            };
        });
    },
}));

export default useJobStore;
