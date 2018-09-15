var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Jen';
        var coords = {latitude:123,longitude:123};
        var url = 'https://www.google.com/maps?q=123,123'
        var message = generateLocationMessage(from, coords.latitude, coords.longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    })
});