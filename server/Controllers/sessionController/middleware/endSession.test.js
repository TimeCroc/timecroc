const endSession = require('./endSession');

describe('endSession middleware', () => {
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();

    res = {
      clearCookie: jest.fn(),
    };

    next = jest.fn();
  });

  it('should clear the session cookie and call next', () => {
    const req = {};
    
    endSession(req, res, next);

    expect(res.clearCookie).toHaveBeenCalledWith('session_id');
    expect(next).toHaveBeenCalled();
  });
});