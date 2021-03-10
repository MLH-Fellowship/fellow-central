import { SET_EVENTS, CLAIM_EVENT_POINTS } from '../actions/types'

const INITIAL_STATE = [
  {
    id: 1,
    title: 'Time Management Tips for the Fellowship',
    start: 'Mon, Mar 8  |  8:30pm',
    link: 'https://google.com',
    isActive: true,
    pointsClaimed: false,
  },
  {
    id: 2,
    title: 'Event #1',
    start: 'Mon, Mar 8  |  8:30pm',
    link: 'https://google.com',
    isActive: true,
    pointsClaimed: false,
  },
  {
    id: 3,
    title: 'Event #2',
    start: 'Mon, Mar 8  |  8:30pm',
    link: 'https://google.com',
    isActive: true,
    pointsClaimed: false,
  },
  {
    id: 4,
    title: 'Event #3',
    start: 'Mon, Mar 8  |  8:30pm',
    vod: 'https://google.com',
    isActive: false,
    pointsClaimed: false,
  },
  {
    id: 5,
    title: 'Event #4',
    start: 'Mon, Mar 8  |  8:30pm',
    vod: 'https://google.com',
    isActive: false,
    pointsClaimed: false,
  },
  {
    id: 6,
    title: 'Event #5',
    start: 'Mon, Mar 8  |  8:30pm',
    vod: 'https://google.com',
    isActive: false,
    pointsClaimed: false,
  },
]

export default function eventsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_EVENTS:
      return [...action.payload]
    case CLAIM_EVENT_POINTS:
      return state.map(event => {
        if(event.id === action.payload) {
          return {...event, pointsClaimed: true};
        } else {
          return event;
        }
      })
    default:
      return state
  }
}
