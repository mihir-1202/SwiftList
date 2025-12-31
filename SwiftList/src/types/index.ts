/*
barrel file acts as a single point of entry for all the exports made by files in the same directory
barrel file doesnt actually contain the data like a python __init__.py file would -> It just creates a link that tells the JavaScript engine: "If anyone asks me for Data, don't look here—go look at ./Data.ts instead."
*/

export * from "./messages";