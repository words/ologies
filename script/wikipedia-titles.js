#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ologies = []

require('wikipedia-titles')
  .on('data', (title) => {
    if (title.match(/ology/i)) {
      ologies.push(title)
    }
  })
  .on('end', () => {
    console.log(`# ${ologies.length} oligies on Wikipedia\n\n`)
    ologies.forEach(title => {
      console.log(`- [${title}](https://en.wikipedia.org/wiki/${title})`)
    })
  })