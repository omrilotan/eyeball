/* eslint-env browser */

import { commas } from '../commas/index.js'
import { coordinates } from '../coordinates/index.js'
import { describe } from '../describe/index.js'

(() => {
  let last
  new PerformanceObserver(
    entryList => entryList.getEntries().forEach(
      (entry, index) => {
        const time = performance.now()
        entry.description = describe(entry)
        entry.coordinates = coordinates(entry.element?.getBoundingClientRect?.())

        // Log all LCP events
        console.log(time, entry, entry.toJSON?.())

        // Draw a box over the LCP element
        const { x, y, w, h } = coordinates(entry.element?.getBoundingClientRect?.())
        if (typeof x !== 'number') { return }
        const div = document.createElement('div')
        div.setAttribute('title', [
          commas(Math.round(entry.renderTime || time)), ' ms',
          '\n',
          commas(entry.size), ' sqpx',
          '\n',
          describe(entry)
        ].join(''))
        div.setAttribute('style', [
          'background:rgba(255,0,0,0.3)',
          'opacity:0',
          'transition:opacity .5s ease-out',
          'border:2px dashed red',
          'box-shadow:2px 2px 5px rgba(0, 0, 0, .5)',
          'box-sizing:border-box',
          'z-index:2147483647',
          'position:fixed',
          `left:${x}px`,
          `top:${y}px`,
          `width:${w}px`,
          `height:${h}px`
        ].join(';'))

        // Make sure larger elements are inserted below the smaller ones, so we can hover over the small one as well
        last
          ? document.body.insertBefore(div, last)
          : document.body.appendChild(div)
        last = div

        const remove = () => {
          div.addEventListener('transitionend', () => div.parentNode?.removeChild(div))
          div.style.opacity = '0'
        }
        setTimeout(() => { div.style.opacity = '1' }, 1000)
        document.addEventListener('scroll', remove, { once: true })
        div.addEventListener('click', remove, { once: true })
      }
    )
  ).observe({ type: 'largest-contentful-paint', buffered: true })

  new PerformanceObserver(
    entryList => entryList.getEntries().forEach(
      (entry, index) => {
        console.log(entry, entry.toJSON?.())
      }
    )
  ).observe({ type: 'element', buffered: true })
})()
