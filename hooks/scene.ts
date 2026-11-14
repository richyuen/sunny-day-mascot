// A clear, sunny day outside: the little orange mascot flies a kite, jumps for
// joy, chases a butterfly, rides a swing, fishes at a pond and floats by in a
// hot-air balloon.
//
// Motion is CSS @keyframes in one <style>. Keep @media to prefers-reduced-motion
// alone: with @media (max-aspect-ratio: ...) rules in the scene, the desktop app
// drew the backdrop as a still picture (found by elimination, Nov 2026). SVG
// animation tags (<animate>, <set>) never ran there either. The markup also
// keeps to what Anthropic's theme-examples scenes use (no <symbol>, <line>,
// comments, transform-box or display); those were removed along the way and
// may not have mattered, but it costs nothing to keep to them.

const STYLE = [
  '.eyes{transform-origin:30px 20px;animation:blink 5s infinite}',
  '@keyframes blink{0%,92%,98%,100%{transform:scaleY(1)}95%{transform:scaleY(.12)}}',
  '.rays{transform-origin:1380px 150px;animation:spin 60s linear infinite}',
  '@keyframes spin{to{transform:rotate(360deg)}}',
  '.glow{transform-origin:1380px 150px;animation:pulse 6s ease-in-out infinite alternate}',
  '@keyframes pulse{to{transform:scale(1.1)}}',
  '.c1{animation:drift 70s ease-in-out infinite alternate}',
  '.c2{animation:drift 90s ease-in-out -30s infinite alternate-reverse}',
  '.c3{animation:drift 55s ease-in-out -10s infinite alternate}',
  '@keyframes drift{from{transform:translateX(-80px)}to{transform:translateX(120px)}}',
  '.birds{animation:birds 30s linear infinite}',
  '@keyframes birds{from{transform:translateX(-200px)}to{transform:translateX(1900px)}}',
  '.kite{transform-origin:292px 748px;animation:sway 4s ease-in-out infinite alternate}',
  '@keyframes sway{from{transform:rotate(-4deg)}to{transform:rotate(5deg)}}',
  '.tail{animation:wiggle .5s ease-in-out infinite alternate}',
  '@keyframes wiggle{to{transform:translateX(6px)}}',
  '.hop{animation:hop 1.1s cubic-bezier(.3,0,.4,1) infinite}',
  '@keyframes hop{0%,100%{transform:translateY(0)}45%,55%{transform:translateY(-70px)}}',
  '.shadow{transform-origin:497px 846px;animation:shrink 1.1s cubic-bezier(.3,0,.4,1) infinite}',
  '@keyframes shrink{0%,100%{transform:scale(1);opacity:.35}45%,55%{transform:scale(.55);opacity:.17}}',
  '.flutter{animation:flutter 7s ease-in-out infinite}',
  '@keyframes flutter{0%,100%{transform:translate(0,0)}25%{transform:translate(50px,-40px)}50%{transform:translate(10px,-80px)}75%{transform:translate(-40px,-30px)}}',
  '.wing{animation:flap .25s ease-in-out infinite alternate}',
  '.wl{transform-origin:1px 0px}.wr{transform-origin:-1px 0px}',
  '@keyframes flap{to{transform:scaleX(.25)}}',
  '.swing{transform-origin:1440px 470px;animation:swing 1.6s ease-in-out infinite alternate}',
  '@keyframes swing{from{transform:rotate(16deg)}to{transform:rotate(-16deg)}}',
  '.bob{animation:bob 2.4s ease-in-out infinite}',
  '@keyframes bob{0%,60%,100%{transform:translateY(0)}70%{transform:translateY(7px)}80%{transform:translateY(-2px)}}',
  '.ripple{transform-origin:1180px 886px;animation:ripple 2.4s ease-out infinite}',
  '@keyframes ripple{0%,60%{transform:scale(.3);opacity:0}70%{opacity:.8}100%{transform:scale(1.4);opacity:0}}',
  '.float{animation:float 12s ease-in-out infinite alternate}',
  '@keyframes float{to{transform:translate(40px,-35px)}}',
  '.grass{animation:breeze 3s ease-in-out infinite alternate}',
  '@keyframes breeze{to{transform:rotate(-7deg)}}',
  '@media (prefers-reduced-motion: reduce){*{animation:none!important}}',
].join('')

/** The mascot, drawn 60 x 50 at (x, y) scaled by k. */
const mascot = (x: number, y: number, k: number) =>
  `<use href="#m" transform="translate(${x} ${y}) scale(${k})"/>`

const tuft = (x: number, y: number, w: number, h: number, delay: string) =>
  `<path class="grass" style="transform-origin:${x}px ${y}px;animation-delay:-${delay}" d="M${x - w} ${y} l${w} -${h} l${w} ${h}z"/>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<style>${STYLE}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
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

<rect width="1600" height="1000" fill="url(#sky)"/>

<g class="sun">
<circle class="glow" cx="1380" cy="150" r="190" fill="url(#sunglow)"/>
<g class="rays" stroke="#ffd54a" stroke-width="10" stroke-linecap="round">
<path d="M1380 40L1380 5"/><path d="M1380 260L1380 295"/>
<path d="M1270 150L1235 150"/><path d="M1490 150L1525 150"/>
<path d="M1302 72L1277 47"/><path d="M1458 228L1483 253"/>
<path d="M1458 72L1483 47"/><path d="M1302 228L1277 253"/>
</g>
<circle cx="1380" cy="150" r="78" fill="#ffd23f"/><circle cx="1380" cy="150" r="64" fill="#ffe36b"/>
</g>

<g fill="#ffffff">
<g transform="translate(620 140)" opacity="0.95"><g class="c1"><use href="#cloud"/></g></g>
<g transform="translate(1050 280) scale(.7)" opacity="0.9"><g class="c2"><use href="#cloud"/></g></g>
<g transform="translate(240 380) scale(.55)" opacity="0.85"><g class="c3"><use href="#cloud"/></g></g>
<g transform="translate(900 470) scale(.45)" opacity="0.8"><g class="c2"><use href="#cloud"/></g></g>
</g>

<g class="birds" fill="none" stroke="#3a4a5a" stroke-width="3" stroke-linecap="round">
<path d="M0 210 q10 -10 20 0 q10 -10 20 0"/><path d="M50 235 q8 -8 16 0 q8 -8 16 0"/><path d="M-30 245 q7 -7 14 0 q7 -7 14 0"/>
</g>

<path d="M0 690 C200 600 380 620 560 670 C760 720 900 610 1120 630 C1320 650 1460 600 1600 640 V1000 H0Z" fill="#a8dc86"/>
<path d="M0 770 C240 720 420 740 640 780 C860 820 1040 740 1280 750 C1440 756 1540 740 1600 750 V1000 H0Z" fill="#7cc75a"/>
<path d="M0 850 C300 820 600 840 800 860 C1000 880 1300 830 1600 840 V1000 H0Z" fill="#5fb045"/>

<g fill="#4c9a36">
${tuft(96, 860, 6, 24, '0s')}${tuft(605, 868, 5, 20, '.6s')}${tuft(996, 872, 6, 22, '1.2s')}
${tuft(1526, 852, 6, 24, '.3s')}${tuft(365, 858, 5, 18, '.9s')}${tuft(1265, 850, 5, 20, '1.5s')}
</g>
<g fill="#ffffff"><use href="#flower" transform="translate(70 800)"/><use href="#flower" transform="translate(640 812)"/><use href="#flower" transform="translate(1560 790)"/></g>
<g fill="#ff8fb1"><use href="#flower" transform="translate(150 905)"/><use href="#flower" transform="translate(1000 820)"/><use href="#flower" transform="translate(1470 900)"/></g>
<g fill="#b48cff"><use href="#flower" transform="translate(560 905)"/><use href="#flower" transform="translate(1090 930)"/></g>

<g class="lift"><g class="float">
<path d="M150 90 C80 90 70 170 110 220 L130 245 H170 L190 220 C230 170 220 90 150 90Z" fill="#ff6f61"/>
<path d="M150 90 C125 90 118 170 135 220 L142 245 H158 L165 220 C182 170 175 90 150 90Z" fill="#ffd23f"/>
<path d="M133 245L132 272" stroke="#7a5230" stroke-width="2"/>
<path d="M167 245L168 272" stroke="#7a5230" stroke-width="2"/>
${mascot(130, 252, 0.667)}
<rect x="126" y="270" width="48" height="24" rx="3" fill="#a06a3a"/><rect x="126" y="270" width="48" height="5" fill="#7a5230"/>
</g></g>

<g class="left">
<g class="kite">
<path d="M292 748L455 300" stroke="#ffffff" stroke-width="2"/>
<g transform="translate(455 300) rotate(15)">
<path d="M0 -48 L34 0 L0 52 L-34 0Z" fill="#ff5d73"/>
<path d="M0 -48 L0 52 M-34 0 L34 0" stroke="#ffffff" stroke-width="2"/>
<path d="M0 -48 L34 0 L0 0Z" fill="#ffd23f"/><path d="M0 0 L-34 0 L0 52Z" fill="#4fb3ff"/>
<g class="tail">
<path d="M0 52 q-12 20 0 40 q12 20 0 40" fill="none" stroke="#ff5d73" stroke-width="3"/>
<path d="M-6 82 l12 4 M-6 122 l12 4" stroke="#ffd23f" stroke-width="5"/>
</g>
</g>
</g>
${mascot(214, 762, 1.4)}
<rect x="288" y="748" width="8" height="24" fill="#d97757"/>

<g class="extra">
<ellipse class="shadow" cx="497" cy="846" rx="38" ry="7" fill="#2f6b22" opacity="0.35"/>
<g class="hop">
${mascot(455, 770, 1.4)}
<rect x="447" y="760" width="8" height="22" fill="#d97757"/><rect x="539" y="760" width="8" height="22" fill="#d97757"/>
</g>
<g class="flutter"><g transform="translate(610 690) scale(1.6)">
<ellipse class="wing wl" cx="-8" cy="0" rx="9" ry="12" fill="#ffb347"/>
<ellipse class="wing wr" cx="8" cy="0" rx="9" ry="12" fill="#ffb347"/>
<rect x="-1.5" y="-9" width="3" height="18" fill="#3a2a1a"/>
</g></g>
</g>
</g>

<g class="right">
<ellipse cx="1180" cy="890" rx="125" ry="30" fill="url(#pond)"/>
<ellipse cx="1150" cy="884" rx="60" ry="8" fill="#ffffff" opacity="0.25"/>
<ellipse class="ripple" cx="1180" cy="886" rx="22" ry="5" fill="none" stroke="#ffffff" stroke-width="2"/>
${mascot(1270, 806, 1.4)}
<path d="M1272 826 Q1220 740 1150 730" fill="none" stroke="#7a5230" stroke-width="4" stroke-linecap="round"/>
<g class="bob">
<path d="M1150 730L1180 880" stroke="#ffffff" stroke-width="1.5"/>
<circle cx="1180" cy="880" r="6" fill="#ff5d73"/><rect x="1174" y="880" width="12" height="4" fill="#ffffff"/>
</g>
<rect x="1525" y="460" width="34" height="340" fill="#8a5a33"/>
<path d="M1540 500 L1430 462" stroke="#8a5a33" stroke-width="18" stroke-linecap="round"/>
<g fill="#3f9a3a"><circle cx="1545" cy="400" r="95"/><circle cx="1460" cy="430" r="70"/><circle cx="1600" cy="450" r="80"/></g>
<g fill="#53b34a"><circle cx="1520" cy="370" r="60"/><circle cx="1470" cy="410" r="40"/></g>
<g class="swing">
<path d="M1425 470L1425 702" stroke="#6b4a2a" stroke-width="3"/>
<path d="M1455 470L1455 702" stroke="#6b4a2a" stroke-width="3"/>
${mascot(1406, 652, 1.133)}
<rect x="1398" y="700" width="84" height="9" rx="2" fill="#a06a3a"/>
</g>
</g>
</svg>`
