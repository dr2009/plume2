import { Store, Actor, ActionType, ActionCreator, Action, IMap } from '../';

const actionType = ActionType(
  //init
  'INIT',
  //start,
  'LOADING_START',
  //end
  'LOADING_END'
);

class LoadingActor extends Actor {
  defaultState() {
    return {
      loading: true
    };
  }

  @Action(actionType.LOADING_END)
  loadingEnd(state: IMap) {
    return state.set('loading', false);
  }

  @Action(actionType.LOADING_START)
  loadingStart(state: IMap) {
    return state.set('loading', true);
  }
}

class HelloActor extends Actor {
  defaultState() {
    return {
      hello: 'hello plume2'
    };
  }
}

const actionCreator = new ActionCreator();

actionCreator.create(actionType.INIT, (store, value: number) => {
  expect(value).toEqual(0);
});

actionCreator.create(actionType.LOADING_END, store => {
  store.dispatch(actionType.LOADING_END);
  expect(store.state().toJS()).toEqual({
    loading: false,
    hello: 'hello plume2'
  });
});

class AppStore extends Store {
  bindActor() {
    return [new LoadingActor(), new HelloActor()];
  }

  bindActionCreator() {
    return actionCreator;
  }
}

describe('test action creator', () => {
  beforeEach(() => {
    new AppStore();
  });

  it('test init', () => {
    actionCreator.fire(actionType.INIT, 0);
  });

  it('test loading end', () => {
    actionCreator.fire(actionType.LOADING_END);
  });

  it('test can nout find any method error', () => {
    actionCreator.fire(actionType.LOADING_START);
  });

  it('test store method', () => {
    const actionCreator = new ActionCreator();

    class AppStore extends Store {
      bindActor() {
        return [new LoadingActor(), new HelloActor()];
      }
      bindActionCreator() {
        return actionCreator;
      }
      @Action(actionType.LOADING_START)
      loadingStart() {
        this.dispatch(actionType.LOADING_START);
      }
    }

    new AppStore();

    actionCreator.fire(actionType.LOADING_START);
  });
});
