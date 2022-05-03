import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import category from './categoryReducer';
import blog from './blogReducer';
export default combineReducers({ auth, alert, category, blog });
