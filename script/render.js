#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {format} = require('util')
const ologies = require('../ologies.json')
let output = `

# Ologies

> A list of ${ologies.length} -ology words and their meanings.

Inspired by the insightful and hilarious [Ologies podcast](https://www.alieward.com/ologies/) by Alie Ward.

`

ologies.forEach(({word, definition}) => {
  output += format(
    '- [%s](https://en.wikipedia.org/wiki/%s) %s\n', 
    word, 
    word, 
    definition
  )
})

const filePath = path.join(__dirname, '../readme.md')
fs.writeFileSync(filePath, output)
console.log('Wrote %s words to %s', ologies.length, filePath)