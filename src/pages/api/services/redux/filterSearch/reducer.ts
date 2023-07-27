import { IActionFilterSearch, IStateFilterSearch } from "@/pages/api/interface";
import actionsTypes from "../actionsTypes";


const initialState = {
    currentFilter: "",
}

const useFilterSearch = (state: IStateFilterSearch = initialState, action: IActionFilterSearch) => {
    if(action.type === actionsTypes.FILTER_SEARCH) {
        return {...state, currentFilter: action.payload};
    }

    return state;
};

export default useFilterSearch;