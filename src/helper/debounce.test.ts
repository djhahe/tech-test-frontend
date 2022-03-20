import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  let func: jest.Mock;
  let debouncedFunc: Function;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
  });

  test('execute just once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    jest.advanceTimersByTime(1000);

    expect(func).toBeCalledTimes(1);
  });
});
