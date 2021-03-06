/* eslint camelcase:0 */
import React from 'react'
import Preview from './Preview'
import geocode from './geocode'

import icon from './icon.png'

/**
 * Plugin to search & display google maps
 *
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
const fn = ({ term, actions, display, config }) => {
  let match = term.match(/^(?:maps?|карт(?:а|ы))\s+(.+)/i)
  match = match || term.match(/(.+)\s(?:maps?|карт(?:а|ы))$/i)
  if (!match) return
  const address = match[1]
  const userLang = config.get('lang')
  geocode(address, userLang).then(points => {
    const result = points.map(point => {
      const { geometry, formatted_address, place_id } = point
      return {
        icon,
        id: place_id,
        title: formatted_address,
        term: formatted_address,
        onSelect: () => {
          const q = encodeURIComponent(address)
          actions.open(`https://maps.google.com/?q=${q}`)
        },
        getPreview: () => <Preview geometry={geometry} name={formatted_address} />
      }
    })
    display(result)
  })
}

export default {
  icon,
  fn,
  name: 'Search on google maps',
  keyword: 'map',
}
