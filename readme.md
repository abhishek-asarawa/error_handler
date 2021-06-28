# Error HANDLER

---

### Introduction:

    Customize standard node error to more detailed and easy JSON structure.

#

### Tech Stack:

1. Node JS

#

### Dependencies:

1. lodash
2. logger

#

### Exports :

## 1. emitError :

Use this function in catch block to handle error.

```
const someFunction = () => {
    try {
        # try block
    } catch (err) {
        emitError(err);
    }
};
```

#

## 2. ServerError :

It is a class build on error class of node.js. Use this class to build your custom errors.

```
const someFunction = () => {
    try {
       throw new ServerError(name, message, stack, severity);
    } catch (err) {
        emitError(err);
    }
};
```

#

## 3. errorEvents :

Use this custom event instance to listen for reformed errors on topic 'reformed_error'.

```
errorEvents.on("reformed_error", (val) => {
    # handle it here
});
```
