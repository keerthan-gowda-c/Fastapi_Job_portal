import { create } from "zustand";
import api from "../api/axios";

const useCompanyStore = create((set,get) => ({
    company:null,
    loading:false,
    hasFetched:false,

    fetchCompany: async(force = false) => {
        const state = get();
        if(!force && state.hasFetched){
            return state.company
        }
        if(state.loading){
            return;
        }
        set({loading:true});

        try{
            const response = await api.get("/companies/me");

            set({
                company:response.data,
                hasFetched:true,
            });
            return response.data;
        }catch(error){
            throw error;
        }finally{
            set({loading:false})
        }
    },

    invalidateCompany: () =>{
        set({hasFetched: false})
    },

    clearCompany: () =>{
        set({company: null,
            loading:false,
            hasFetched:false,
        });
    },
}));

export default useCompanyStore;