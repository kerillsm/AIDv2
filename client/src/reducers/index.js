import {combineReducers} from 'redux';
import mapsReducer from './mapsReducer';
import isLoggedIn from './isLoggedIn';
import isAuthShown from './isAuthShown';
import login from './login';
import register from './register';
import mapsProfile from './mapsProfile'
import username from './username';
import goal from './goal';
import deleteMap from './deleteMap';
import calendarEvents from './calendarEvents';
import pieChart from './pieChart';
import lastMaps from './lastMaps'
import barProfile from './barProfile';
import goals from './goals'
import multiDecision from './multiDecision'
import lastMultiDecision from './lastMultiDecision'
import lastSavedTrees from './lastSavedTrees'
import userRestriction from './userRestriction'
import achievements from './achievements';
import isAdmin from './isAdmin';


const appReducer = combineReducers({
    maps: mapsReducer,
    isLoggedIn,
    isAuthShown,
    login,
    register,
    mapsProfile,
    username,
    goal,
    deleteMap,
    calendarEvents,
    pieChart,
    lastMaps,
    barProfile,
    goals,
    multiDecision,
    lastMultiDecision,
    lastSavedTrees,
    userRestriction,
    achievements,
    isAdmin
});

const rootReducer = (state, action) => {
    if (action.type === 'ERROR') {
        state = undefined
    }

    return appReducer(state, action)
};
export default rootReducer;
