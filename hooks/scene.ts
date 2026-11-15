// A clear, sunny day outside: the little orange mascot flies a kite, jumps for
// joy, chases a butterfly, rides a swing, fishes at a pond and floats by in a
// hot-air balloon.
//
// Layout: one picture, 1320 x 1000, drawn `xMidYMax meet`, so nothing in it is
// ever cropped. The mascots sit in its outer 260 units on each side, which on a
// window about 1320 px wide or wider fall in the clear margins beside the
// app's frosted chat column (about 760 px wide). The sky and hills run far past
// the picture's edges, and the root <svg> draws them there, so a window of any
// shape shows more sky and grass instead of empty bars.
//
// The app draws neither nested <svg> layers pinned to an edge (they came out
// blank) nor anything moving when the scene holds @media (max-aspect-ratio)
// rules; SVG animation tags (<animate>, <set>) never run there either. So: one
// root <svg>, motion as CSS @keyframes in one <style>, pivots in px, the only
// @media prefers-reduced-motion, and no comments in the markup.

const STYLE = [
  '.eyes{transform-origin:30px 20px;animation:blink 5s infinite}',
  '@keyframes blink{0%,92%,98%,100%{transform:scaleY(1)}95%{transform:scaleY(.12)}}',
  '.rays{transform-origin:1210px 125px;animation:spin 60s linear infinite}',
  '@keyframes spin{to{transform:rotate(360deg)}}',
  '.glow{transform-origin:1210px 125px;animation:pulse 6s ease-in-out infinite alternate}',
  '@keyframes pulse{to{transform:scale(1.1)}}',
  '.c1{animation:drift 70s ease-in-out infinite alternate}',
  '.c2{animation:drift 90s ease-in-out -30s infinite alternate-reverse}',
  '.c3{animation:drift 55s ease-in-out -10s infinite alternate}',
  '@keyframes drift{from{transform:translateX(-80px)}to{transform:translateX(120px)}}',
  '.birds{animation:birds 40s linear infinite}',
  '@keyframes birds{from{transform:translateX(-900px)}to{transform:translateX(2300px)}}',
  '.kite{transform-origin:98px 866px;animation:sway 4s ease-in-out infinite alternate}',
  '@keyframes sway{from{transform:rotate(-4deg)}to{transform:rotate(5deg)}}',
  '.tail{animation:wiggle .5s ease-in-out infinite alternate}',
  '@keyframes wiggle{to{transform:translateX(6px)}}',
  '.hop{animation:hop 1.1s cubic-bezier(.3,0,.4,1) infinite}',
  '@keyframes hop{0%,100%{transform:translateY(0)}45%,55%{transform:translateY(-70px)}}',
  '.shadow{transform-origin:192px 958px;animation:shrink 1.1s cubic-bezier(.3,0,.4,1) infinite}',
  '@keyframes shrink{0%,100%{transform:scale(1);opacity:.35}45%,55%{transform:scale(.55);opacity:.17}}',
  '.flutter{animation:flutter 7s ease-in-out infinite}',
  '@keyframes flutter{0%,100%{transform:translate(0,0)}25%{transform:translate(30px,-40px)}50%{transform:translate(0,-80px)}75%{transform:translate(-40px,-30px)}}',
  '.wing{animation:flap .25s ease-in-out infinite alternate}',
  '.wl{transform-origin:1px 0px}.wr{transform-origin:-1px 0px}',
  '@keyframes flap{to{transform:scaleX(.25)}}',
  '.swing{transform-origin:1180px 500px;animation:swing 1.6s ease-in-out infinite alternate}',
  '@keyframes swing{from{transform:rotate(12deg)}to{transform:rotate(-12deg)}}',
  '.bob{animation:bob 2.4s ease-in-out infinite}',
  '@keyframes bob{0%,60%,100%{transform:translateY(0)}70%{transform:translateY(6px)}80%{transform:translateY(-2px)}}',
  '.ripple{transform-origin:1118px 956px;animation:ripple 2.4s ease-out infinite}',
  '@keyframes ripple{0%,60%{transform:scale(.3);opacity:0}70%{opacity:.8}100%{transform:scale(1.4);opacity:0}}',
  '.float{animation:float 12s ease-in-out infinite alternate}',
  '@keyframes float{to{transform:translate(20px,-30px)}}',
  '.grass{animation:breeze 3s ease-in-out infinite alternate}',
  '@keyframes breeze{to{transform:rotate(-7deg)}}',
  '@media (prefers-reduced-motion: reduce){*{animation:none!important}}',
].join('')

/** The mascot, drawn 60 x 50 at (x, y) scaled by k. */
const mascot = (x: number, y: number, k: number) =>
  `<use href="#m" transform="translate(${x} ${y}) scale(${k})"/>`

const tuft = (x: number, y: number, w: number, h: number, delay: string) =>
  `<path class="grass" style="transform-origin:${x}px ${y}px;animation-delay:-${delay}" d="M${x - w} ${y} l${w} -${h} l${w} ${h}z"/>`

// Sky and hills: the picture is x 0..1320, y 0..1000; everything here runs
// from x -3000 to 4320 and y -2000 to 3000 so any window is filled.
const BACKGROUND = `<rect x="-3000" y="-2000" width="7320" height="5000" fill="url(#sky)"/>
<g fill="#ffffff">
<g transform="translate(480 140)" opacity="0.95"><g class="c1"><use href="#cloud"/></g></g>
<g transform="translate(910 280) scale(.7)" opacity="0.9"><g class="c2"><use href="#cloud"/></g></g>
<g transform="translate(330 380) scale(.55)" opacity="0.85"><g class="c3"><use href="#cloud"/></g></g>
<g transform="translate(760 470) scale(.45)" opacity="0.8"><g class="c2"><use href="#cloud"/></g></g>
<g transform="translate(-300 220) scale(.8)" opacity="0.9"><g class="c3"><use href="#cloud"/></g></g>
<g transform="translate(1650 330) scale(.65)" opacity="0.9"><g class="c1"><use href="#cloud"/></g></g>
</g>
<g class="birds" fill="none" stroke="#3a4a5a" stroke-width="3" stroke-linecap="round">
<path d="M0 210 q10 -10 20 0 q10 -10 20 0"/><path d="M50 235 q8 -8 16 0 q8 -8 16 0"/><path d="M-30 245 q7 -7 14 0 q7 -7 14 0"/>
</g>
<path d="M-3000 660 C-2000 620 -800 700 -140 690 C60 600 240 620 420 670 C620 720 760 610 980 630 C1180 650 1320 600 1460 640 C2200 700 3200 610 4320 650 V3000 H-3000Z" fill="#a8dc86"/>
<path d="M-3000 760 C-2000 730 -900 790 -140 770 C100 720 280 740 500 780 C720 820 900 740 1140 750 C1300 756 1400 740 1460 750 C2300 790 3300 730 4320 760 V3000 H-3000Z" fill="#7cc75a"/>
<path d="M-3000 850 C-1800 830 -900 870 -140 850 C160 820 460 840 660 860 C860 880 1160 830 1460 840 C2400 860 3400 830 4320 850 V3000 H-3000Z" fill="#5fb045"/>
<g fill="#ffffff"><use href="#flower" transform="translate(500 812)"/><use href="#flower" transform="translate(840 800)"/></g>
<g fill="#ff8fb1"><use href="#flower" transform="translate(420 905)"/><use href="#flower" transform="translate(860 920)"/></g>
<g fill="#b48cff"><use href="#flower" transform="translate(620 890)"/><use href="#flower" transform="translate(950 870)"/></g>`

// Left margin: x 0..260.
const LEFT = `<g class="float">
<path d="M130 70 C60 70 50 150 90 200 L110 225 H150 L170 200 C210 150 200 70 130 70Z" fill="#ff6f61"/>
<path d="M130 70 C105 70 98 150 115 200 L122 225 H138 L145 200 C162 150 155 70 130 70Z" fill="#ffd23f"/>
<path d="M113 225L112 252M147 225L148 252" stroke="#7a5230" stroke-width="2"/>
${mascot(110, 232, 0.667)}
<rect x="106" y="250" width="48" height="24" rx="3" fill="#a06a3a"/><rect x="106" y="250" width="48" height="5" fill="#7a5230"/>
</g>
<g class="kite">
<path d="M98 866L200 470" stroke="#ffffff" stroke-width="2"/>
<g transform="translate(200 470) rotate(15)">
<path d="M0 -48 L34 0 L0 52 L-34 0Z" fill="#ff5d73"/>
<path d="M0 -48 L0 52 M-34 0 L34 0" stroke="#ffffff" stroke-width="2"/>
<path d="M0 -48 L34 0 L0 0Z" fill="#ffd23f"/><path d="M0 0 L-34 0 L0 52Z" fill="#4fb3ff"/>
<g class="tail">
<path d="M0 52 q-12 20 0 40 q12 20 0 40" fill="none" stroke="#ff5d73" stroke-width="3"/>
<path d="M-6 82 l12 4 M-6 122 l12 4" stroke="#ffd23f" stroke-width="5"/>
</g>
</g>
</g>
<g fill="#4c9a36">${tuft(14, 952, 5, 20, '0s')}</g>
${mascot(20, 880, 1.4)}
<rect x="94" y="866" width="8" height="24" fill="#d97757"/>
<ellipse class="shadow" cx="192" cy="958" rx="38" ry="7" fill="#2f6b22" opacity="0.35"/>
<g class="hop">
${mascot(150, 888, 1.4)}
<rect x="142" y="878" width="8" height="22" fill="#d97757"/><rect x="234" y="878" width="8" height="22" fill="#d97757"/>
</g>
<g class="flutter"><g transform="translate(190 740) scale(1.6)">
<ellipse class="wing wl" cx="-8" cy="0" rx="9" ry="12" fill="#ffb347"/>
<ellipse class="wing wr" cx="8" cy="0" rx="9" ry="12" fill="#ffb347"/>
<rect x="-1.5" y="-9" width="3" height="18" fill="#3a2a1a"/>
</g></g>
<g fill="#ffffff"><use href="#flower" transform="translate(130 975)"/></g>`

// Right margin: x 1060..1320.
const RIGHT = `<g>
<circle class="glow" cx="1210" cy="125" r="133" fill="url(#sunglow)"/>
<g class="rays" stroke="#ffd54a" stroke-width="8" stroke-linecap="round">
<path d="M1210 48L1210 24M1210 202L1210 226M1133 125L1109 125M1287 125L1311 125M1156 71L1139 54M1264 179L1281 196M1264 71L1281 54M1156 179L1139 196"/>
</g>
<circle cx="1210" cy="125" r="55" fill="#ffd23f"/><circle cx="1210" cy="125" r="45" fill="#ffe36b"/>
</g>
<rect x="1282" y="470" width="28" height="490" fill="#8a5a33"/>
<path d="M1296 515 L1170 492" stroke="#8a5a33" stroke-width="16" stroke-linecap="round"/>
<g fill="#3f9a3a"><circle cx="1260" cy="420" r="62"/><circle cx="1195" cy="448" r="46"/><circle cx="1300" cy="452" r="20"/></g>
<g fill="#53b34a"><circle cx="1245" cy="398" r="40"/><circle cx="1200" cy="440" r="28"/></g>
<g class="swing">
<path d="M1165 500L1165 742M1195 500L1195 742" stroke="#6b4a2a" stroke-width="3"/>
<rect x="1138" y="740" width="84" height="9" rx="2" fill="#a06a3a"/>
${mascot(1146, 690, 1.133)}
</g>
<ellipse cx="1118" cy="960" rx="54" ry="16" fill="url(#pond)"/>
<ellipse cx="1108" cy="956" rx="26" ry="4" fill="#ffffff" opacity="0.3"/>
<ellipse class="ripple" cx="1118" cy="956" rx="16" ry="4" fill="none" stroke="#ffffff" stroke-width="2"/>
${mascot(1180, 884, 1.4)}
<path d="M1182 902 Q1150 820 1094 812" fill="none" stroke="#7a5230" stroke-width="4" stroke-linecap="round"/>
<g class="bob">
<path d="M1094 812L1118 951" stroke="#ffffff" stroke-width="1.5"/>
<circle cx="1118" cy="951" r="5" fill="#ff5d73"/><rect x="1113" y="951" width="10" height="3" fill="#ffffff"/>
</g>
<g fill="#4c9a36">${tuft(1272, 958, 5, 20, '.8s')}</g>
<g fill="#ff8fb1"><use href="#flower" transform="translate(1300 975)"/></g>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 1000" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
<style>${STYLE}</style>
<defs>
<linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
<stop offset="0" stop-color="#4aa8ea"/><stop offset="0.55" stop-color="#8fcdf5"/><stop offset="1" stop-color="#d4effc"/>
</linearGradient>
<radialGradient id="sunglow" cx="0.5" cy="0.5" r="0.5">
<stop offset="0" stop-color="#fff6c4" stop-opacity="0.95"/><stop offset="0.45" stop-color="#ffe680" stop-opacity="0.45"/><stop offset="1" stop-color="#ffe680" stop-opacity="0"/>
</radialGradient>
<linearGradient id="pond" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#5fb4e8"/><stop offset="1" stop-color="#2f86c4"/>
</linearGradient>
<g id="cloud">
<ellipse cx="0" cy="0" rx="70" ry="30"/><ellipse cx="-45" cy="8" rx="45" ry="24"/><ellipse cx="50" cy="10" rx="50" ry="22"/><ellipse cx="10" cy="-22" rx="42" ry="30"/>
</g>
<g id="m">
<rect x="6" y="8" width="48" height="30" fill="#d97757"/>
<rect x="0" y="18" width="6" height="8" fill="#d97757"/><rect x="54" y="18" width="6" height="8" fill="#d97757"/>
<rect x="10" y="38" width="5" height="10" fill="#d97757"/><rect x="20" y="38" width="5" height="10" fill="#d97757"/>
<rect x="35" y="38" width="5" height="10" fill="#d97757"/><rect x="45" y="38" width="5" height="10" fill="#d97757"/>
<g class="eyes"><rect x="17" y="16" width="5" height="8" fill="#1d1712"/><rect x="38" y="16" width="5" height="8" fill="#1d1712"/></g>
</g>
<g id="flower">
<circle cx="0" cy="-5" r="4"/><circle cx="5" cy="0" r="4"/><circle cx="0" cy="5" r="4"/><circle cx="-5" cy="0" r="4"/><circle cx="0" cy="0" r="3" fill="#ffd23f"/>
</g>
</defs>
${BACKGROUND}
${LEFT}
${RIGHT}
</svg>`
