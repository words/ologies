#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const wiktionary = require('wiktionary')
const {chain} = require('lodash')
const Bottleneck = require("bottleneck")
const limiter = new Bottleneck({maxConcurrent: 5})
const results = []

const ologies = require('an-array-of-english-words')
  .filter(word => word.endsWith('ology'))
  // .slice(0, 10)
  .forEach(word => {
    limiter.schedule(lookup, word)
  })

async function lookup (word) {
  try {
    const result = await wiktionary(word) 
    results.push({
      word: word,
      definition: result.text
    })
  } catch (e) {
    results.push({
      word: word,
      definition: '_no definition found_'
    })
    console.error('not found:', word)
  }
}

limiter.on('idle', () => {
  const words = chain(results).orderBy('word').value()
  const filePath = path.join(__dirname, '../ologies.json')
  fs.writeFileSync(filePath, JSON.stringify(words, null, 2))
  console.log('Wrote %s words to %s', words.length, filePath)
})