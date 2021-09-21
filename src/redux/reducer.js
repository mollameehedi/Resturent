import COMMENTS from '../data/comments';
import { combineReducers } from 'redux';
import * as actionType from './actionTypes';
import {InitialContactForm} from './Forms';
import { createForms } from 'react-redux-form';


const dishReducer = (dishState ={ isLoading: false, dishes:[] }, action) => {
   switch(action.type){
       case actionType.DISHES_LOADING:
           return{
               ...dishState,
               isLoading: true,
           }

        case actionType.LOAD_DISHES:
            return{
                ...dishState,
                isLoading:false,
                dishes:action.payload
            }

       default:
           return dishState;
   }

}
const commentReducer = (commentState = COMMENTS, action) => {
    switch(action.type){
        case actionType.ADD_COMMENT:
            let comment = action.payload
            comment.id = commentState.length;
            comment.date = new Date().toDateString();
            return commentState.concat(comment)

            default:
                return commentState;
    }

    
}

export const Reducer = combineReducers({
    dishes : dishReducer,
    comments: commentReducer,
    ...createForms({
        feedback: InitialContactForm
    })
})