
# Flekin

Calculate the readability of user input text based on Flesch-Kincaid formulas


## Installation

* This package is ESM only and will need Node.js ver.12+
* Install flekin with npm

```cli
  npm install flekin
```
## API

```js
import {flekin} from 'flekin'

flekin('Nothing is so fatiguing as the eternal hanging on of an uncompleted task.')

//  {
//    grade_level: 9.45,
//    reading_ease: 50.47,
//    word_count: 13,
//    syllable_count: 22,
//    sentence_count: 1
//  }

```


## Related

[Flesch-Kincaid wiki](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests)


## License

[MIT](https://raw.githubusercontent.com/jpagtama/flekin/main/license)

