import axios from 'axios';
import {
    CHECK_AUTH,
    FETCH_MAPS, IS_AUTH_SHOWN, LOGOUT, LOGIN, REGISTER, FETCH_MAPS_PROFILE, FETCH_SLIDER_PROFILE, FETCH_TREES_PROFILE,
    SORT_ASC, SORT_DESC, SEARCH_MAPS, FETCH_USERNAME, POST_GOAL, COUNT_GOAL, DELETE_MAP, FETCH_CALENDAR_EVENT,
    FETCH_PIE, FETCH_LAST_MAPS, FETCH_GOALS_BAR, FETCH_GOALS, FETCH_GOAL, HANDLE_CHANGE_ITEM, ADD_ROW, ADD_COLUMN,
    TOGGLE_PROS_CONF, HANDLE_CHANGE_TITLE, DELETE_ROW, DELETE_COLUMN, SCORE_COLUMN, FETCH_MULTI_DECISION,
    FETCH_LAST_MULTI_DECISION, DEFAULT_MULTI_DECISION, FETCH_ALL, FETCH_MULTI_DECISIONS, FETCH_LAST_SAVED_TREES,
    REGISTER_USER_RESTRICTION, UPDATE_USER_RESTRICTION, SAVE_MAP_USER_RESTRICTION, SAVE_GOAL_USER_RESTRICTION,
    SAVE_PROSCONS_USER_RESTRICTION, SAVE_MOVIESTREE_USER_RESTRICTION, FETCH_ACHIEVMENTS, FETCH_ISADMIN
} from "./types";
import passwordHash from 'password-hash';


export const fetchMaps = () => async dispatch => {
    const payload = await axios.get('/api/user/maps/admin');
    dispatch({
        type:FETCH_MAPS,
        payload:payload.data
    })
}

export const checkAuth = () => async dispatch => {
    const payload = await axios.get('/api/islogged');
    dispatch({
        type:CHECK_AUTH,
        payload:payload.data
    })
}

export const logout = () => async dispatch => {
    const payload = await axios.get('/api/logout');
    dispatch({
        type:LOGOUT,
        payload:payload.data
    })
}

export const isAuthShown = (bool) => async dispatch => {
    dispatch({
        type:IS_AUTH_SHOWN,
        payload:bool
    })
}

export const login = (email,password) => async dispatch => {
    //let password = passwordHash.generate(`${passwordOld}`);
    const payload = await axios.post('/api/login',{email,password});
    dispatch({
        type:LOGIN,
        payload:payload.data,
        user:email
    })
    isAuthShown(false)
}


export const register = (email,password) => async dispatch => {
    const payload = await axios.post('/api/register',{email,password});
    dispatch({
        type:REGISTER,
        payload:payload.data
    })

}

export const fetchMapsProfile = (user) => async dispatch => {
    const payload = await axios.get(`/api/user/maps/all/${user}`)
    dispatch({
        type: FETCH_MAPS_PROFILE,
        payload:payload.data,
        user
    })
}

export const fetchSliderProfile = (user) => async dispatch => {
    const payload = await axios.get(`/api/user/maps/all/${user}`)
    dispatch({
        type: FETCH_SLIDER_PROFILE,
        payload:payload.data
    })
}

export const fetchTreesProfile = (user) => async dispatch => {
    const payload = await axios.get(`/api/user/maps/all/${user}`)
    dispatch({
        type: FETCH_TREES_PROFILE,
        payload:payload.data
    })
}

export const sortAsc = (maps) => dispatch => {
    dispatch({
        type:SORT_ASC,
        payload:maps
    })
}

export const sortDesc = (maps) => dispatch => {
    dispatch({
        type:SORT_DESC,
        payload:maps
    })
}

export const searchMaps = (filter,searchReq,user) => async dispatch => {

    console.log(searchReq);
    if(filter === 'maps'){
        const maps = await axios.get(`/api/user/maps/all/${user}`)
        dispatch({
            type:SEARCH_MAPS,
            payload:maps.data[0],
            searchReq:searchReq
        })
    }
    if(filter === 'multiDecision'){
        const multiDecision = await axios.get(`/api/procon/${user}/all`)
        dispatch({
            type:SEARCH_MAPS,
            payload:multiDecision.data,
            searchReq:searchReq
        })
    }

}

export const fetchUsername = () => async dispatch => {
    const payload = await axios.get(`/api/self`);
    dispatch({
        type:FETCH_USERNAME,
        payload:payload.data
    })
}

export const fetchIsAdmin = () => async dispatch => {
    const payload = await axios.get(`/api/isAdmin`);
    dispatch({
        type: FETCH_ISADMIN,
        payload: payload.data
    })
}



export const deleteMap = (type,id) => async dispatch => {
    console.log('id',id);
    console.log('type',type)
    if(type === 'maps'){
        const payload = await axios.post(`/api/map/delete`,{id});
        dispatch({
            type:DELETE_MAP,
            payload:payload.data
        })
    }
    else {
        const payload = await axios.post(`/api/multiDecision/delete`,{id});
        dispatch({
            type:DELETE_MAP,
            payload:payload.data
        })
    }
}

export const fetchCalendarEvents = (user) => async dispatch => {
    console.log('user',user)
    const goals = await axios.get(`/api/user/goals/${user}`);
    const maps = await axios.get(`/api/user/maps/all/${user}`);
    const multiDecision = await axios.get(`/api/procon/${user}/all`)
    dispatch({
        type:FETCH_CALENDAR_EVENT,
        maps:maps.data,
        goals:goals.data,
        multiDecision:multiDecision.data
    })
}

export const fetchPie = (user) => async dispatch => {
    const goals = await axios.get(`/api/user/goals/${user}`);
    const maps = await axios.get(`/api/user/maps/all/${user}`);
    const multiDecision = await axios.get(`/api/procon/${user}/all`)
    const trees = await axios.get(`/api/movieTree/saved/${user}`)

    dispatch({
        type:FETCH_PIE,
        maps:maps.data,
        goals:goals.data,
        multiDecision:multiDecision.data,
        trees:trees.data
    })
}


export const fetchLastMaps = (user) => async dispatch => {
    const payload = await axios.get(`/api/user/maps/all/${user}`)
    dispatch({
        type: FETCH_LAST_MAPS,
        payload:payload.data
    })
}

export const fetchGoalsBar = (user) => async dispatch => {
    const goals = await axios.get(`/api/user/goals/${user}`);
    dispatch({
        type:FETCH_GOALS_BAR,
        goals:goals.data
    })
}

export const fetchGoals = (user) => async dispatch => {
    const goals = await axios.get(`/api/user/goals/${user}`);
    dispatch({
        type:FETCH_GOALS,
        goals:goals.data
    })
}



export const fetchGoal = (id) => async dispatch => {
    const goal = await axios.get(`/api/goals/${id}`);
    dispatch({
        type:FETCH_GOAL,
        goal:goal.data
    })
}


export const handleChangeItem = (event,rowId,columnId) => dispatch => {
    dispatch({
        type:HANDLE_CHANGE_ITEM,
        event,
        rowId,
        columnId
    })
}

export const handleChangeTitle = (event,columnId) => dispatch => {
    dispatch({
        type:HANDLE_CHANGE_TITLE,
        event,
        columnId
    })
}


export const addRow = (columnId) => dispatch => {
    dispatch({
        type:ADD_ROW,
        columnId
    })
}

export const addColumn = (columnId) => dispatch => {
    dispatch({
        type:ADD_COLUMN,
        columnId
    })
}

export const toggleProsConf = (status,rowId,columnId) => dispatch => {
    dispatch({
        type: TOGGLE_PROS_CONF,
        status,
        rowId,
        columnId
    })
}

export const deleteRow = (rowId,columnId) => dispatch => {
    dispatch({
        type: DELETE_ROW,
        rowId,
        columnId
    })
}

export const deleteColumn = (columnId) => dispatch => {
    dispatch({
        type: DELETE_COLUMN,
        columnId
    })
}

export const fetchMultiDecision = (id) =>async dispatch => {

    const data = await axios.get(`/api/procon/${id}`)
    dispatch({
        type:FETCH_MULTI_DECISION,
        payload:data.data
    })
}

export const fetchLastMultiDecision = (user) => async dispatch => {
    const data = await axios.get(`/api/procon/${user}/all`)
    dispatch({
        type:FETCH_LAST_MULTI_DECISION,
        payload:data.data
    })
}

export const defaultMultiDecision = () => dispatch => {
    dispatch({
        type:DEFAULT_MULTI_DECISION
    })
}

export const addNew = (items) => dispatch => {
    dispatch({
        type: 'ADD_NEW',
        payload: items
    })
}

export const fetchAll = (user) => async dispatch => {
    const multiDecision = await axios.get(`/api/procon/${user}/all`)
    const maps = await axios.get(`/api/user/maps/all/${user}`)
    dispatch({
        type:FETCH_ALL,
        maps:maps.data,
        multiDecision:multiDecision.data
    })
}

export const fetchMultiDecisions = (user) => async dispatch => {
    const multiDecision = await axios.get(`/api/procon/${user}/all`)

    dispatch({
        type:FETCH_MULTI_DECISIONS,
        multiDecision:multiDecision.data
    })
}


export const fetchLastSavedTrees = (user) => async dispatch =>{
    const trees = await axios.get(`/api/movieTree/saved/${user}`)
    dispatch({
        type: FETCH_LAST_SAVED_TREES,
        trees:trees.data
    })
}

export const registerUserRestriction = (user) => async dispatch =>{
    const info = await axios.post('/api/userRestriction/saveUser',{user})
    dispatch({
        type: REGISTER_USER_RESTRICTION,
        payload:info.data
    })
}


export const updateUserRestriction = (user) => async dispatch =>{
    const info = await axios.get(`/api/userRestriction/lastDate/${user}`)
    dispatch({
        type: UPDATE_USER_RESTRICTION,
        payload:info.data
    })
}

export const saveMapUserRestriction = (user) => async dispatch =>{
    const info = await axios.get(`/api/userRestriction/maps/update/${user}`)
    dispatch({
        type: SAVE_MAP_USER_RESTRICTION,
        payload:info.data
    })
}

export const saveGoalUserRestriction = (user) => async dispatch =>{
    const info = await axios.get(`/api/userRestriction/goals/update/${user}`)
    dispatch({
        type: SAVE_GOAL_USER_RESTRICTION,
        payload:info.data
    })
}

export const saveProsConsUserRestriction = (user) => async dispatch =>{
    const info = await axios.get(`/api/userRestriction/prosCons/update/${user}`)
    dispatch({
        type: SAVE_PROSCONS_USER_RESTRICTION,
        payload:info.data
    })
}

export const saveMoviesTreeUserRestriction = (user) => async dispatch =>{
    const info = await axios.get(`/api/userRestriction/moviesTree/update/${user}`)
    dispatch({
        type: SAVE_MOVIESTREE_USER_RESTRICTION,
        payload:info.data
    })
}

export const saveBooksTreeUserRestriction = (user) => async dispatch =>{
    const info = await axios.get(`/api/userRestriction/booksTree/update/${user}`)
    dispatch({
        type: SAVE_MOVIESTREE_USER_RESTRICTION,
        payload:info.data
    })
}


export const fetchAchievements = (user) => async dispatch => {
    const goals = await axios.get(`/api/user/goals/${user}`);
    const maps = await axios.get(`/api/user/maps/all/${user}`);
    const multiDecision = await axios.get(`/api/procon/${user}/all`)
    const movieTrees = await axios.get(`/api/movieTree/saved/${user}`)
    const bookTrees = await axios.get(`/api/bookTree/saved/${user}`)

    dispatch({
        type:FETCH_ACHIEVMENTS,
        maps:maps.data,
        goals:goals.data,
        multiDecision:multiDecision.data,
        movieTrees:movieTrees.data,
        bookTrees: bookTrees.data
    })
}








