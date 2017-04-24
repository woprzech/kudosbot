const hello = require('./../services/helloWorld');

test('should return Hello world ', () => {
    expect(callHello({data: 'data'})).toEqual({
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello world",
            input: {
                data: "data"
            }
        })
    });

});

function callHello(data) {
    let result = undefined;
    hello({data: 'data'}, {}, sendResponse);

    function sendResponse(a, response) {
        result = response
    }

    return result;
}