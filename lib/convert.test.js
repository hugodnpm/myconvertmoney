const convert = require('./convert')

test('convert 4 to 4', () => {
    expect(convert.convert(4,2)).toBe('8')
})