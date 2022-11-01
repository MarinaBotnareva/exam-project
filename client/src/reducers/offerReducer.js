import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  moderatorFilter: null,
  setOfferApprovementError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.RECEIVE_OFFER_LIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    
    case ACTION.RECEIVE_OFFER_LIST: {
      return {
        ...state,
        isFetching: false,
        offers: [...action.data],
      };
    }

    case ACTION.CLEAR_OFFER_LIST: {
      return {
        ...state,
        error: null,
        offers: [],
      };
    }

    case ACTION.SET_NEW_MODERATOR_FILTER: {
      return {
        ...initialState,
        isFetching: false,
        moderatorFilter: action.filter,
      };
    }

    case ACTION.SET_OFFER_APPROVEMENT_ERROR: {
      return {
        ...state,
        setOfferApprovementError: action.error,
      };
    }

    case ACTION.CLEAR_SET_OFFER_APPROVEMENT_ERROR: {
      return {
        ...state,
        setOfferApprovementError: null,
      };
    }

    case ACTION.CHANGE_STORE_FOR_APPROVEMENT: {
      return {
        ...state,
        error: null,
        offers: [...action.data],
      };
    }
    
    default:
      return state;
  }
}
