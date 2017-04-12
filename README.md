# Character Generator
Given an input, this will generate a similar output based on the probabilities of a Markov chain.

## Use
Declare a CharacterChain object with a `depth >= 1`. A depth of 10 is around the ideal for generating English sentences.
```javascript
var cc = new CharacterChain(10);
```
Next, use the `feed()` method to provide an input for the chain. You must give it `depth` or more sequential characters for the chain to function at all, though it may not generate characters well. An input of ~500 English words is a safe minimum. It is important to note that, while `feed()` can be called with multiple strings as well as one concatenated string, the strings will be considered independent when separated. That is, the end of one string and the start of another will have an effect on the probabilities if they are concatenated.
```javascript
cc.feed(longString);
cc.feed(otherLongString);
```
Finally, the `nextChar()` method pseudo-randomly generates the next character based on the last `n` characters in the argument where `n` is the depth of the chain.
Any arguments will be interpreted as strings. Each argument will be interpreted as a separate string to hash, and will be given its own output (in the order of input).
```javascript
generatedString += cc.nextChar(generatedString);
```
This process is streamlined with the functions `generateChain()`, `generateString()`, and `randomInitial()`:
```javascript
generateChain(str: string, depth: number)
generateString(chain: CharacterChain, length: number, [initial: string])
randomInitial(chain: CharacterChain)
```
`generateChain()` returns a CharacterChain object that has been initialized with the provided depth and fed the provided string.

`generateString()` returns a string of the provided length using the provided chain and optionally a provided string. The provided string must have length greater than or equal to the depth of the provided chain. If no initial string is provided, a random one is generated.

`randomInitial()` returns a string by randomly traversing the tree of the provided chain. The randomness in this case is uniform and only depends on the existence of nodes in the tree; not their probabilities.
