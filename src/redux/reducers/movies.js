//Import action types
import * as Actions from '../actions/movies';

const initialState = {
    movies: null,
    selectedMovie: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case Actions.UPDATE:
            return {
                ...state,
                movies: {
                    ...action.data.movies
                },
            };


        case Actions.CLEAR:
            return {
                ...initialState
            };




        default:
            return {
                ...state,
            };
    }
}

export default reducer;