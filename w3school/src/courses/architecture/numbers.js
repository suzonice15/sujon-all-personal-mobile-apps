// Architecture chapter: Numbers.

export default {
  id: 'numbers',
  title: 'Numbers',
  description: 'Binary, two\'s complement and floating point',
  icon: 'calculate',
  lessons: [
    {
      id: 'arch-binary',
      title: 'Binary and hex',
      blocks: [
        { type: 'text', value: 'Computers store bits. Eight bits make a byte. Hex is a compact way to write bits: one hex digit is four bits, so one byte is two hex digits.' },
        { type: 'code', lang: 'text', tryIt: false, value: `binary    hex   decimal
0000      0     0
1010      A     10
1111      F     15
11111111  FF    255` },
        { type: 'note', value: 'Memory addresses, colours and bit masks are usually written in hex. 0xFF is 255, not 15.' },
      ],
    },
    {
      id: 'arch-twos-complement',
      title: "Two's complement",
      blocks: [
        { type: 'text', value: 'Signed integers use two\'s complement: the most significant bit has a negative weight. This makes addition and subtraction the same hardware operation.' },
        { type: 'code', lang: 'text', tryIt: false, value: `8-bit:
 0000 0101 = +5
 1111 1011 = -5
 1111 1111 = -1
 1000 0000 = -128` },
        { type: 'note', value: 'Overflow wraps or is undefined depending on the language and type. Check limits before adding two large signed values.' },
      ],
    },
    {
      id: 'arch-floating-point',
      title: 'Floating point',
      blocks: [
        { type: 'text', value: 'IEEE 754 represents decimals as sign, exponent and mantissa. It cannot represent every decimal exactly, which is why 0.1 + 0.2 is not exactly 0.3.' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log(0.1 + 0.2);
console.log((0.1 + 0.2).toFixed(2));
console.log(Number.EPSILON);` },
        { type: 'list', items: [
          'float32 - 24-bit significand, about 7 digits',
          'float64 - 53-bit significand, about 15 digits',
          'Use decimal or integer cents for money',
          'Compare floats with a tolerance, not ==',
        ] },
        { type: 'note', value: 'Floating point is a trade-off between range and precision. It is excellent for science and a bad choice for currency.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'numbers',
      q: 'How many bits are in a byte?',
      options: ['4', '8', '16', '32'],
      answer: 1,
      explain: 'Eight bits make one byte.',
    },
    {
      chapterId: 'numbers',
      q: 'What does 0xFF equal?',
      options: ['15', '255', '256', '1024'],
      answer: 1,
      explain: 'FF is 1111 1111, which is 255.',
    },
    {
      chapterId: 'numbers',
      q: 'Why is 0.1 + 0.2 not exactly 0.3?',
      options: ['The CPU is broken', 'Binary floating point cannot represent every decimal exactly', 'JavaScript is wrong', 'The compiler optimises it'],
      answer: 1,
      explain: 'IEEE 754 has finite precision.',
    },
  ],
};
