import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene'

// Sky-washed paper and deep-sky ink; the mascot's terracotta for literals.
const { theme, problems } = makeColors({
  label: 'Sunny day',
  only: 'light',
  roles: { accent: '#1e7fc2', danger: '#c23b2e', success: '#3f8f3a', warning: '#b7791f', pro: '#c4623e' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e6f2f8',
        'surface-1': '#eef7fb',
        'surface-2': '#f6fbfd',
        'text-primary': '#132b38',
        'text-secondary': '#2d4a59',
        'text-muted': '#4a6574',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'sunny-day', glass: { blur: 14, tint: '#f4fafd', opacity: 0.62 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return (
      <Svg
        source={SCENE}
        alt="A sunny meadow where the little orange mascot flies a kite, jumps, swings, fishes and rides a hot-air balloon"
        isInteractive
      />
    )
  })
}
