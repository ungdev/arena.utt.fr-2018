import axios from '../lib/axios'
import fail from '../lib/store.fail'
import { push } from 'react-router-redux'

import { fetchUser } from './user'

export const SET_TEAMS = 'teams/SET_TEAMS'
export const SET_CANCELREQUEST_ERROR = 'teams/SET_CANCELREQUEST_ERROR'
export const SET_CREATETEAM_ERROR = 'teams/SET_CREATETEAM_ERROR'
export const SET_JOINTEAM_ERROR = 'teams/SET_JOINTEAM_ERROR'
export const SET_ACCEPT_ERROR = 'teams/SET_ACCEPT_ERROR'
export const SET_REFUSE_ERROR = 'teams/SET_REFUSE_ERROR'
export const SET_KICK_ERROR = 'teams/SET_KICK_ERROR'

const initialState = {
  teams: [],
  cancelRequestError: null,
  createTeamError: null,
  joinTeamError: null,
  acceptError: null,
  refuseError: null,
  kickError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload
      }
    case SET_CANCELREQUEST_ERROR:
      return {
        ...state,
        cancelRequestError: action.payload
      }
    case SET_CREATETEAM_ERROR:
      return {
        ...state,
        createTeamError: action.payload
      }
    case SET_JOINTEAM_ERROR:
      return {
        ...state,
        joinTeamError: action.payload
      }
    case SET_ACCEPT_ERROR:
      return {
        ...state,
        acceptError: action.payload
      }
    case SET_REFUSE_ERROR:
      return {
        ...state,
        refuseError: action.payload
      }
    case SET_KICK_ERROR:
      return {
        ...state,
        kickError: action.payload
      }
    default:
      return state
  }
}

export const cancelRequest = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.delete(`/team/${id}/cancelRequest`, { headers: { 'X-Token': authToken } })

      dispatch(fetchUser())
    } catch (err) {
      return fail({
        dispatch,
        mutationError: SET_CANCELREQUEST_ERROR,
        err: err.response.data.error
      })
    }
  }
}

export const createTeam = ({ name }) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(`/team`, { name }, { headers: { 'X-Token': authToken } })

      dispatch(fetchUser())
      dispatch(push('/dashboard/team'))
    } catch (err) {
      return fail({
        dispatch,
        mutationError: SET_CREATETEAM_ERROR,
        err: err.response.data.error
      })
    }
  }
}

export const joinTeam = ({ team, message }) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    if (!team || !team.value) {
      return fail({
        dispatch,
        mutationError: SET_JOINTEAM_ERROR,
        err: 'INVALID_FORM'
      })
    }

    try {
      await axios.post(
        `/team/${team.value}/join`,
        { message },
        { headers: { 'X-Token': authToken } }
      )

      dispatch(fetchUser())
      dispatch(push('/dashboard/requests'))
    } catch (err) {
      return fail({
        dispatch,
        mutationError: SET_JOINTEAM_ERROR,
        err: err.response.data.error
      })
    }
  }
}

export const allowPlayer = user => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const team = getState().user.user.team.id

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(`/team/${team}/accept`, { user }, { headers: { 'X-Token': authToken } })

      dispatch(fetchUser())
    } catch (err) {
      return fail({
        dispatch,
        mutationError: SET_ACCEPT_ERROR,
        err: err.response.data.error
      })
    }
  }
}

export const refusePlayer = user => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const team = getState().user.user.team.id

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(`/team/${team}/refuse`, { user }, { headers: { 'X-Token': authToken } })

      dispatch(fetchUser())
    } catch (err) {
      return fail({
        dispatch,
        mutationError: SET_REFUSE_ERROR,
        err: err.response.data.error
      })
    }
  }
}

export const kickPlayer = user => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    const team = getState().user.user.team.id

    if (!authToken || authToken.length === 0) {
      return
    }

    if (user === 'self') {
      user = getState().user.user.id
    }

    try {
      await axios.post(`/team/${team}/kick`, { user }, { headers: { 'X-Token': authToken } })

      dispatch(fetchUser())
    } catch (err) {
      return fail({
        dispatch,
        mutationError: SET_KICK_ERROR,
        err: err.response.data.error
      })
    }
  }
}
