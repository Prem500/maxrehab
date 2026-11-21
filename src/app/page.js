"use client";
/* ───────────────────────────────────────────────────────────────────────────
   MAXREHAB — Neuro Rehabilitation Centre · drop-in app/page.js (Next.js App Router)
   Layout: utility bar → header → title banner → intro → sticky tabs → About →
   Conditions → Spinal Cord Injury → Therapies & Support → Advanced Technologies →
   Leadership → Request-a-consultation band → Footer.
   ► IMAGES: save the 6 files into  public/images/  with the names in the IMG object below.
     Until a file exists you will see a broken image; set a value to "" to show the dashed placeholder.
   ► Text, contact details and doctor info: edit CONFIG + DATA below.
   ─────────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

/* ═══ IMAGES — paste your own here ═══ */
const IMG = {   // files go in  public/images/  (Next.js serves them from /images/...)
  logo: "/fulllogo.png",                  // MaxRehab brand logo
  hero: "/images/hero.jpg",               // intro, right side (4:3)
  therapy: "/images/therapy.jpg",         // therapies section, right side (4:5)
  gait: "/images/gait-clinic.jpg",        // technologies: gait & hand-function (16:10)
  vr: "/images/vr-motion.jpg",            // technologies: VR / motion analysis (16:10)
  doctor: "/images/doctor.jpg",           // Dr. Prem Prakash portrait (1:1)
  cta: "/images/consultation.jpg",        // consultation band, left side (4:5)
  pool: "/images/hydrotherapy.jpg",       // therapies section: aquatic therapy feature (16:9 or 3:2)
};
const VIDEO = ""; // optional: YouTube/Drive link for "Watch our video"

/* ═══ CONFIG ═══ */
const C = {
  name: "MaxRehab Advanced Neurorehabilitation Center",
  shortName: "MaxRehab",
  phone: "+91 70041 19766",
  wa: "917004119766", // WhatsApp number, digits only
  email: "Samarthclinic.info@gmail.com",
  addr: "Canal Rd, Rajputana Mohalla, Dehri on Sone, Rohtas, Bihar 821307",
  hours: "Mon – Sat · 10 AM – 8 PM",
  map: "https://maps.google.com/?q=Dehri+on+Sone+Bihar",
};
const THREE_SRC = "https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js";
const LOADER_SRC = "https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/loaders/GLTFLoader.js";

/* ═══ DATA ═══ */
const TOP = [["Find a Specialist", "team"], ["Find a Treatment", "therapies"], ["Find a Condition", "conditions"], ["Request a Consultation", "contact"]];
const NAV = [["Home", "top"], ["About", "about"], ["Conditions", "conditions"], ["Therapies", "therapies"], ["Technology", "tech"], ["Team", "team"], ["Contact", "contact"]];
const TABS = [["About", "about"], ["Conditions", "conditions"], ["Spinal Cord Injury", "sci"], ["Therapies & Technologies", "therapies"], ["Team", "team"], ["Contact", "contact"]];

const CONDS = [
  ["Brain or spinal cord injuries", ["Traumatic brain injury", "Spinal cord injury (paraplegia, tetraplegia)", "Post-neurosurgery recovery"]],
  ["Neurodegenerative diseases", ["Parkinson's disease", "Multiple sclerosis", "Motor neuron disease & ataxias"]],
  ["Infections", ["Meningitis & encephalitis", "Polio & post-polio syndrome", "Brain abscess recovery"]],
  ["Vascular disorders", ["Ischaemic & haemorrhagic stroke", "Transient ischaemic attack (TIA)", "Subdural haematoma"]],
  ["Neuromuscular conditions", ["Bell's palsy & facial palsy", "Peripheral neuropathy", "Guillain-Barré syndrome, muscular dystrophy, myasthenia gravis"]],
  ["Children & development", ["Cerebral palsy", "Developmental delay", "Paediatric neuro-rehabilitation"]],
];

const THER = [
  ["Physical Therapy", "Physiotherapists and the wider team work together to restore strength, mobility and movement control through strengthening, balance training, gait re-education and tone management."],
  ["Occupational Therapy", "Therapists focus on regaining independence in daily life — dressing, bathing, cooking, writing — and assess the home and workplace for aids and adaptations."],
  ["Speech & Swallowing Therapy", "Treatment for language disorders, slurred speech, voice change and swallowing difficulty, with exercises and strategies the family can continue at home."],
  ["Counselling & Cognitive Support", "Psychological support for patients and families, plus attention, memory and problem-solving training for people whose thinking is affected by injury or illness."],
  ["Caregiver & Social Support", "Practical guidance on benefits, transport, equipment and home set-up, so families are never left to navigate recovery alone."],
  ["Hydrotherapy", "Therapy in warm water, where buoyancy supports body weight and the water gently resists movement. It makes early standing, stepping and balance practice safer and less painful for people with weakness, spasticity or poor balance."],
  ["Case Management", "Every patient has one coordinator who connects the patient, family and treating doctors, so plans stay consistent from first visit to discharge."],
  ["Continuing Care", "Recovery does not end at the clinic door. We plan home programmes, follow-ups, home visits and tele-reviews to protect progress long-term."],
];

const SCI = [
  ["Structured assessment", "Neurological level and completeness are classified (ASIA scale) and function is tracked with standard scales from the first session."],
  ["Core skills", "Trunk control, transfers, wheelchair skills, standing and — where potential exists — walking practice."],
  ["Stimulation-assisted training", "Where clinically appropriate, electrical stimulation supports weak muscles during task practice."],
  ["Whole-person care", "Bladder, bowel and skin-care education, pain and spasticity management, and caregiver training."],
];

const TECH = [
  ["Gait & Hand-Function Clinic", "gait", "Body-weight-supported treadmill training, functional electrical stimulation and task-oriented hand-function equipment are built into each patient's plan to rebuild walking and arm movement."],
  ["Virtual Reality, Motion Analysis & Biofeedback", "vr", "Interactive VR tasks and sensor-based movement analysis make practice engaging, while objective measurements show exactly where to focus treatment next."],
];

const DOC = ["Dr. Prem Prakash", "Founder & Director · Senior Physiotherapist", "Dr. Prem Prakash leads MaxRehab's clinical programmes. A BPT with more than five years of practice, he is certified in Manual Therapy and in the Neuro Developmental Technique (Neurology Department, AIIMS New Delhi), and is a pioneer of advanced neurorehabilitation in Dehri on Sone."];

/* ═══ HELPERS ═══ */
const load = (src) => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.async = true; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
const PATHS = { arr: "M5 12h14M13 6l6 6-6 6", chk: "M5 12l5 5L20 7", menu: "M4 7h16M4 12h16M4 17h16", x: "M6 6l12 12M18 6L6 18", pulse: "M3 12h4l3-8 4 16 3-8h4", play: "M8 5l11 7-11 7z", ph: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" };
const Ico = ({ n, c = "w-5 h-5" }) => (<svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={PATHS[n]} /></svg>);
const waLink = (t) => `https://wa.me/${C.wa}?text=${encodeURIComponent(t)}`;

const Img = ({ k, label, className = "" }) => IMG[k]
  ? <img src={IMG[k]} alt={label} loading="lazy" decoding="async" className={`object-cover ${className}`} />
  : <div className={`ph grid place-items-center text-center text-xs font-bold text-slate-400 p-4 ${className}`}><span>EMPTY IMAGE SLOT<br /><span className="text-slate-500">{label}</span><br /><code className="font-mono font-semibold">IMG.{k}</code></span></div>;

const H2 = ({ a, b, c = "" }) => <h2 className={`text-3xl md:text-[2.1rem] leading-tight ${c}`}><b className="font-bold">{a}</b> <span className="t-teal font-light">{b}</span></h2>;
const Ring = ({ c = "" }) => <i aria-hidden className={`pointer-events-none absolute rounded-full border-[28px] md:border-[36px] border-[#2bb5a0] w-72 h-72 md:w-96 md:h-96 ${c}`} />;
const Btn = ({ href, children, v = "p", ...r }) => <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`btn btn-${v}`} {...r}>{children}</a>;

/* ═══ THREE.JS — human nervous system, rotating 360° (right → left) ═══ */
function bodyLite(T, el) {
  try {
    const mob = innerWidth < 768, q = mob ? .5 : 1, R = Math.random, rn = () => R() - .5, V = (x, y, z) => new T.Vector3(x, y, z);
    const r = new T.WebGLRenderer({ antialias: !mob, alpha: true, powerPreference: "low-power" });
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5)); el.appendChild(r.domElement);
    Object.assign(r.domElement.style, { opacity: 0, transition: "opacity 2s" });
    const sc = new T.Scene(), cam = new T.PerspectiveCamera(50, 1, .1, 100), g = new T.Group(); cam.position.z = 14; sc.add(g);

    // 1 · faint body silhouette: points scattered on tapered capsules
    const sil = [], cap = (a, b, r1, r2, n, sz = 1) => { a = V(...a); b = V(...b); for (let i = 0, t, k, d; i < n * q; i++) { t = R(); k = r1 + (r2 - r1) * t; d = V(rn(), rn(), rn()).normalize(); sil.push(a.clone().lerp(b, t).add(V(d.x * k, d.y * k, d.z * k * sz))); } };
    cap([0, 4.1, 0], [0, 4.5, 0], .48, .48, 170); cap([0, 3.9, 0], [0, 3.4, 0], .22, .26, 30);
    cap([0, 3.1, 0], [0, .5, 0], 1, .78, 420, .55); cap([0, .5, 0], [0, -.1, 0], .78, .7, 60, .6);
    [-1, 1].forEach((s) => {
      cap([s * 1.15, 3.1, 0], [s * 1.6, 1.6, 0], .28, .22, 70); cap([s * 1.6, 1.6, 0], [s * 1.9, .3, .1], .22, .15, 60); cap([s * 1.9, .3, .1], [s * 1.95, -.1, .1], .15, .12, 20);
      cap([s * .5, -.1, 0], [s * .55, -1.9, .05], .38, .27, 100); cap([s * .55, -1.9, .05], [s * .6, -4, 0], .27, .18, 90); cap([s * .6, -4, 0], [s * .6, -4.25, .4], .18, .16, 24);
    });

    // 2 · nerve paths: spinal cord, plexuses, limbs, ribs-like intercostals, fine twigs
    const P = [], main = [], curve = (pts, n, j) => new T.CatmullRomCurve3(pts.map((p) => V(...p))).getPoints(n).map((p) => p.add(V(rn() * j, rn() * j, rn() * j)));
    const add = (pts, n, j = .03, m) => { const c = curve(pts, n, j); P.push(c); m && main.push(c); return c; };
    const cord = add([[0, 4.1, 0], [0, 3.5, -.15], [0, 2, -.3], [0, .5, -.25]], 40, .01, 1);
    [-1, 1].forEach((s) => {
      add([[0, 4.1, 0], [0, 3.4, -.15], [s * .6, 3.2, -.1], [s * 1.15, 3.1, 0], [s * 1.6, 1.6, 0], [s * 1.9, .3, .1]], 36, .03, 1);
      for (let k = 0; k < 5; k++) add([[s * 1.9, .3, .1], [s * (1.8 + k * .06), -.15 - (k == 2) * .08, .1]], 4, .01);
      add([[0, .5, -.25], [s * .5, -.1, -.1], [s * .55, -1.9, .05], [s * .6, -4, 0], [s * .6, -4.25, .4]], 44, .03, 1);
      for (let y = 3; y > .5; y -= .32) { const a = .75 + (y - .4) / 2.6 * .25, b = a * .55, arc = [[0, y, -.28]]; for (let i = 0; i <= 4; i++) { const al = i / 4 * Math.PI * .85; arc.push([s * a * Math.sin(al), y - al * .1, -b * Math.cos(al)]); } add(arc, 14, .015); }
    });
    main.slice().forEach((c) => { for (let i = 0; i < 12 * q; i++) { const p = c[R() * c.length | 0], d = V(rn(), rn(), rn()).normalize().multiplyScalar(.3 + R() * .35); add([[p.x, p.y, p.z], [p.x + d.x * .5, p.y + d.y * .5, p.z + d.z * .5], [p.x + d.x, p.y + d.y, p.z + d.z]], 6, .02); } });

    // 3 · brain: small dense network + vertebrae glow + base ring
    const br = Array.from({ length: 46 }, () => { let v; do v = V(rn() * 2, rn() * 2, rn() * 2); while (v.lengthSq() > 1); return v.multiply(V(.45, .5, .5)).add(V(0, 4.35, 0)); });
    const bl = []; br.forEach((a, i) => br.map((b, j) => [a.distanceTo(b), j]).filter((d) => d[1] != i).sort((x, y) => x[0] - y[0]).slice(0, 2).forEach(([, j]) => bl.push(a, br[j])));
    const verts = cord.filter((_, i) => i % 2 == 0), ring = Array.from({ length: 90 }, (_, i) => V(Math.cos(i / 90 * 6.283) * 2.6, -4.45, Math.sin(i / 90 * 6.283) * 2.6));
    const seg = []; P.forEach((c) => { for (let i = 0; i < c.length - 1; i++) seg.push(c[i], c[i + 1]); });

    const cv = document.createElement("canvas"); cv.width = cv.height = 64; const x = cv.getContext("2d"), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "#fff"); gr.addColorStop(.35, "rgba(255,255,255,.55)"); gr.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    const map = new T.CanvasTexture(cv), pm = (o) => new T.PointsMaterial({ map, transparent: true, depthWrite: false, blending: T.AdditiveBlending, ...o });
    const pts = (a, o) => g.add(new T.Points(new T.BufferGeometry().setFromPoints(a), pm(o))), lines = (a, o) => g.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(a), new T.LineBasicMaterial({ transparent: true, blending: T.AdditiveBlending, depthWrite: false, ...o })));
    pts(sil, { size: .11, color: 0x8ff0dc, opacity: .45 }); lines(seg, { color: 0x2dd4bf, opacity: .55 }); lines(bl, { color: 0xb4b4ff, opacity: .6 });
    pts(br, { size: .3, color: 0xc4b5fd }); pts(verts, { size: .24, color: 0x8ff0dc }); pts(ring, { size: .1, color: 0x14b8a6, opacity: .6 });

    // 4 · signals travelling down the nerves
    const M = mob ? 16 : 40, pos = new Float32Array(M * 3), pg = new T.BufferGeometry(); pg.setAttribute("position", new T.BufferAttribute(pos, 3)); g.add(new T.Points(pg, pm({ size: .55, color: 0xffffff })));
    const pick = () => (R() < .5 ? main[R() * main.length | 0] : P[R() * P.length | 0]);
    const pl = Array.from({ length: M }, () => { const p = pick(); return { p, s: R() * (p.length - 1), v: .25 + R() * .35 }; });
    const step = () => { pl.forEach((o, k) => { o.s += o.v; if (o.s >= o.p.length - 1) { o.p = pick(); o.s = 0; } const i = o.s | 0, a = o.p[i], b = o.p[i + 1], f = o.s - i; pos.set([a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, a.z + (b.z - a.z) * f], k * 3); }); pg.attributes.position.needsUpdate = true; };

    const size = () => { const w = el.clientWidth, h = el.clientHeight; r.setSize(w, h, false); r.domElement.style.cssText += "width:100%;height:100%"; cam.aspect = w / h; cam.updateProjectionMatrix(); g.position.x = w > 900 ? 3.6 : 0; g.scale.setScalar(w < 600 ? .75 : 1); };
    const ro = new ResizeObserver(size); ro.observe(el); size();
    let vis = true, raf, ty = 0, f = 0; const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting)); io.observe(el);
    const mv = (e) => (ty = e.clientY / innerHeight - .5); addEventListener("pointermove", mv, { passive: true });
    const loop = () => { raf = requestAnimationFrame(loop); if (!vis || document.hidden) return; step(); f++; g.rotation.y -= .006; g.rotation.x += (ty * .25 - g.rotation.x) * .04; g.position.y = .2 + Math.sin(f / 70) * .08; r.render(sc, cam); };
    calm ? (g.rotation.y = -.5, step(), r.render(sc, cam)) : loop(); requestAnimationFrame(() => (r.domElement.style.opacity = 1));
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener("pointermove", mv); sc.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); }); map.dispose(); r.dispose(); r.domElement.remove(); };
  } catch { return () => { }; }
}



/* ═══ THREE.JS — anatomical nerve body: real skinned humanoid + procedural nervous system ═══
   A free humanoid model (three.js "Xbot", Mixamo) is rendered as an X-ray hologram; the nervous
   system (brain, spinal cord, plexuses, limb nerves, fingers, ribs-level branches, optic nerves)
   is generated along its skeleton, so every nerve moves with the body. Falls back to a light
   procedural body if the model cannot load. To self-host: put the .glb in /public and use "/body.glb". */
const MODELS = ["https://cdn.jsdelivr.net/gh/mrdoob/three.js@r147/examples/models/gltf/Xbot.glb", "https://raw.githubusercontent.com/mrdoob/three.js/r147/examples/models/gltf/Xbot.glb"];
const VS_SKIN = `#include <skinning_pars_vertex>
varying vec3 vN;varying vec3 vV;varying float vY;varying float vD;
void main(){
#include <beginnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <begin_vertex>
#include <skinning_vertex>
vec4 mv=modelViewMatrix*vec4(transformed,1.);
vN=normalize(transformedNormal);vV=-mv.xyz;vY=(modelMatrix*vec4(transformed,1.)).y;vD=-mv.z;
gl_Position=projectionMatrix*mv;}`;
const FS_SKIN = `uniform float t;uniform float gain;uniform vec3 c1;uniform vec3 c2;varying vec3 vN;varying vec3 vV;varying float vY;varying float vD;
void main(){
float f=1.-abs(dot(normalize(vN),normalize(vV)));
float rim=pow(f,2.2);
float sc=.5+.5*sin(vY*70.-t*1.5);
float sw=exp(-pow((fract(vY*.11-t*.1)-.5)*10.,2.));
float a=gain*(.05+rim*.8+sc*.03+sw*.3)*(.35+.65*(1.-smoothstep(12.,19.,vD)));
gl_FragColor=vec4(mix(c1,c2,rim)+sw*.4,a);}`;
const PS = `uniform float k;uniform float sz;
#ifdef PU
attribute float aS;attribute float aA;
#endif
varying float vF;
void main(){vec4 mv=modelViewMatrix*vec4(position,1.);float S=sz;vF=1.;
#ifdef PU
S=aS;vF=aA;
#endif
vF*=.35+.65*(1.-smoothstep(12.,19.,-mv.z));gl_PointSize=S*k/-mv.z;gl_Position=projectionMatrix*mv;}`;
const PF = `uniform vec3 c;uniform float al;varying float vF;
void main(){float d=length(gl_PointCoord-.5)*2.;float a=pow(smoothstep(1.,0.,d),2.);gl_FragColor=vec4(c,al*a*vF);}`;

function build(T, el, gl) {
  const mob = innerWidth < 768, R = Math.random, rn = () => R() - .5, V = (x, y, z) => new T.Vector3(x, y, z);
  const r = new T.WebGLRenderer({ antialias: !mob, alpha: true, powerPreference: "low-power" });
  r.setPixelRatio(Math.min(devicePixelRatio, 1.5)); el.appendChild(r.domElement);
  Object.assign(r.domElement.style, { opacity: 0, transition: "opacity 2s" });
  const sc = new T.Scene(), cam = new T.PerspectiveCamera(50, 1, .1, 100), g = new T.Group(); cam.position.z = 14; sc.add(g); sc.fog = new T.Fog(0x000000, 12.5, 18);
  const U = { t: { value: 0 }, k: { value: 1 } };
  const skin = new T.ShaderMaterial({ uniforms: { t: U.t, gain: { value: 1 }, c1: { value: new T.Color(0x0d6b8a) }, c2: { value: new T.Color(0x8ff0dc) } }, vertexShader: VS_SKIN, fragmentShader: FS_SKIN, transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide });

  const joints = skin.clone(); joints.uniforms = { ...skin.uniforms, gain: { value: .22 } };
  // ── model, normalised to 9 units tall and centred
  const m = gl.scene, BL = [], bi = {}; g.add(m); g.updateMatrixWorld(true);
  m.traverse((o) => { if (o.isBone) { bi[o.name.replace(/^mixamorig:?/, "")] = BL.length; BL.push(o); } if (o.isMesh) { o.material = /Joint/.test(o.name) ? joints : skin; o.frustumCulled = false; } });
  const wp = (n) => V(0, 0, 0).setFromMatrixPosition(BL[bi[n]].matrixWorld), foot = () => Math.min(wp("LeftToe_End").y, wp("RightToe_End").y);
  m.scale.setScalar(9 / (wp("HeadTop_End").y - foot())); g.updateMatrixWorld(true); m.position.y -= foot() + 4.5; g.updateMatrixWorld(true);
  const ginv = new T.Matrix4().copy(g.matrixWorld).invert(), BI = BL.map((b) => new T.Matrix4().multiplyMatrices(ginv, b.matrixWorld).invert()), M = BL.map(() => new T.Matrix4());

  // ── nodes live in bone-local space, so the whole nervous system deforms with the skeleton
  const L = [], B = [], S = [], S2 = [], S3 = [], S4 = [], paths = [], trunk = [], beads = [], verts = [], brain = [];
  const node = (p, b) => { const q = p.clone().applyMatrix4(BI[bi[b]]); L.push(q.x, q.y, q.z); B.push(bi[b]); return B.length - 1; };
  const P = (e) => (typeof e == "string" ? wp(e).applyMatrix4(ginv) : e[0].clone()), BN = (e) => (typeof e == "string" ? e : e[1]), seg = (a, b, h) => [S, S2, S4][h | 0].push(a, b);
  const twig = (a, p, d, len, b, dp) => { const q = p.clone().addScaledVector(d, len).add(V(rn(), rn(), rn()).multiplyScalar(len * .4)), n = node(q, b); seg(a, n); if (dp) for (let k = 0; k < 2; k++) twig(n, q, d.clone().add(V(rn(), rn(), rn()).multiplyScalar(1.1)).normalize(), len * .66, b, dp - 1); };
  const chain = (names, o = {}) => {
    const { n = 6, off, tw = 0, len = .3, dp = 1, h = 0, bead = 0, tr = 0, cb } = o, pts = names.map(P), N = pts.length, ids = [];
    off && pts.forEach((p) => p.add(off));
    const cv = new T.CatmullRomCurve3(pts);
    for (let i = 0; i < N; i++) for (let k = 0; k < (i < N - 1 ? n : 1); k++) {
      const p = (i < N - 1 ? cv.getPoint((i + k / n) / (N - 1)) : pts[i].clone()).add(V(rn(), rn(), rn()).multiplyScalar(.012)), id = node(p, BN(names[i]));
      ids.length && seg(ids[ids.length - 1], id, h); ids.push(id); cb && cb(p, BN(names[i]), id, ids.length);
      if (tw && i < N - 1 && R() < tw) { const ax = pts[i + 1].clone().sub(pts[i]).normalize(), d = V(rn(), rn(), rn()).normalize(); d.addScaledVector(ax, -d.dot(ax)).addScaledVector(ax, .3).normalize(); twig(id, p, d, len * (.7 + R() * .6), BN(names[i]), dp); }
    }
    (tr ? trunk : paths).push(ids); bead && ids.forEach((id, i) => i % bead == 0 && beads.push(id)); return ids;
  };
  const strands = (names, o) => [0, 1, 2, 3].forEach((k) => chain(names, { ...o, off: k ? V(rn(), rn(), rn()).multiplyScalar(.12) : 0, tw: k ? .12 : o.tw, h: k ? 2 : 1, tr: !k, bead: k ? 0 : 1 }));

  const W = P("LeftArm").distanceTo(P("RightArm")), D = W * .55, bk = D * .3, SP = Object.fromEntries(["Spine", "Spine1", "Spine2", "Neck", "Hips"].map((n) => [n, P(n)]));
  // brain (two lobes with a longitudinal fissure, gyri-like relief) + brain stem
  const hc = P("Head").lerp(P("HeadTop_End"), .6), hh = P("Head").distanceTo(P("HeadTop_End")), rx = .36 * hh, ry = .4 * hh, rz = .42 * hh;
  for (let i = 0; i < (mob ? 260 : 520); i++) { const d = V(rn(), rn(), rn()).normalize(); let k = 1 + .07 * Math.sin(d.x * 11 + 1.3) * Math.sin(d.y * 9) + .06 * Math.sin(d.z * 12); if (Math.abs(d.x) < .08) k *= .86; if (d.y < -.4) d.y *= .55; brain.push(node(hc.clone().add(V(d.x * rx * k, d.y * ry * k, d.z * rz * k)), "Head")); }
  brain.forEach((a) => { let b1 = -1, b2 = -1, d1 = 1e9, d2 = 1e9; brain.forEach((b) => { if (b == a) return; const d = (L[a * 3] - L[b * 3]) ** 2 + (L[a * 3 + 1] - L[b * 3 + 1]) ** 2 + (L[a * 3 + 2] - L[b * 3 + 2]) ** 2; if (d < d1) { d2 = d1; b2 = b1; d1 = d; b1 = b; } else if (d < d2) { d2 = d; b2 = b; } }); S3.push(a, b1, a, b2); });
  // spinal cord (+ vertebrae beads) from the brain stem down to the pelvis
  const cord = chain([...["Hips", "Spine", "Spine1", "Spine2", "Neck"].map((n, i) => [P(n).add(V(0, 0, -bk * [1, 1, 1, 1, .7][i])), n]), [hc.clone().add(V(0, -ry * .95, -rz * .25)), "Head"]], { n: 8, h: 1, tr: 1, cb: (p, b, id, c) => { if (c % 2) return; verts.push(id);[-1, 1].forEach((s) => seg(id, node(p.clone().add(V(s * .16, -.02, -.02)), b), 2)); } });
  // brachial plexus → arms → fingers, lumbosacral plexus → legs → toes
  ["Left", "Right"].forEach((s) => {
    strands([[P("Spine2").add(V(0, 0, -bk)), "Spine2"], s + "Shoulder", s + "Arm", s + "ForeArm", s + "Hand"], { n: 8, tw: .9, len: .13, dp: 2 });
    ["Thumb", "Index", "Middle", "Ring", "Pinky"].forEach((f) => chain([s + "Hand", ...[1, 2, 3, 4].map((i) => `${s}Hand${f}${i}`)], { n: 3, h: 1, bead: 1 }));
    strands([[P("Hips").add(V(0, 0, -bk)), "Hips"], s + "UpLeg", s + "Leg", s + "Foot", s + "ToeBase", s + "Toe_End"], { n: 8, tw: .9, len: .2, dp: 2 });
    const tb = node(P(s + "ToeBase"), s + "ToeBase"); for (let k = 0; k < 5; k++) twig(tb, P(s + "ToeBase"), V((k - 2) * .2, -.05, 1).normalize(), .1, s + "ToeBase", 0);
    chain([s + "Eye", [hc.clone().add(V(0, 0, -rz * .5)), "Head"]], { n: 6, h: 1 });
  });
  // intercostal-style nerves wrapping the torso, tapered chest → waist
  const yA = SP.Spine.y - (SP.Spine1.y - SP.Spine.y) * .5, yB = SP.Spine2.y + (SP.Neck.y - SP.Spine2.y) * .4;
  for (let i = 0; i < 11; i++) {
    const y = yA + (yB - yA) * i / 10, near = ["Spine", "Spine1", "Spine2"].reduce((a, n) => (Math.abs(SP[n].y - y) < Math.abs(SP[a].y - y) ? n : a)), c = SP[near], a = W * (.31 + .09 * i / 10), b = D * .45;
    [-1, 1].forEach((s) => chain([[V(c.x, y, c.z - bk), near], ...[.15, .3, .45, .6, .75, .9].map((f) => [V(c.x + s * a * Math.sin(f * Math.PI), y - f * .12, c.z - b * Math.cos(f * Math.PI)), near])], { n: 2, h: 2 }));
  }
  // facial / trigeminal fan
  const hn = node(P("Head"), "Head"); for (let k = 0; k < 16; k++) twig(hn, P("Head"), V(rn() * 1.4, rn() * .6 + .1, 1).normalize(), .13, "Head", 2);

  // ── shared dynamic position buffer, many index views
  const n = B.length, pos = new T.Float32BufferAttribute(new Float32Array(n * 3), 3).setUsage(T.DynamicDrawUsage), pa = pos.array;
  const mk = (C, idx, mat) => { const gm = new T.BufferGeometry(); gm.setAttribute("position", pos); gm.setIndex(idx); const o = new C(gm, mat); o.frustumCulled = false; g.add(o); return o; };
  const lm = (color, op) => new T.LineBasicMaterial({ color, transparent: true, opacity: op, blending: T.AdditiveBlending, depthWrite: false });
  const pm = (color, sz, al, x) => new T.ShaderMaterial({ uniforms: { k: U.k, sz: { value: sz }, al: { value: al }, c: { value: new T.Color(color) } }, vertexShader: PS, fragmentShader: PF, transparent: true, depthWrite: false, blending: T.AdditiveBlending, ...x });
  mk(T.LineSegments, S, lm(0x2dd4bf, .75)); mk(T.LineSegments, S2, lm(0xb8fff0, 1)); mk(T.LineSegments, S4, lm(0x2dd4bf, .85)); mk(T.LineSegments, S3, lm(0x9b9bff, .35));
  mk(T.Points, beads, pm(0x8ff0dc, .06, .55)); mk(T.Points, brain, pm(0xa78bfa, .045, .6)); mk(T.Points, verts, pm(0xd9fff7, .1, .8));

  // signals: bright heads with fading trails, running along trunk nerves
  const MP = mob ? 14 : 30, TR = 6, pp = new Float32Array(MP * TR * 3), aS = new Float32Array(MP * TR), aA = new Float32Array(MP * TR);
  for (let i = 0; i < MP * TR; i++) { const t = i % TR; aS[i] = .24 * (1 - t / TR * .7); aA[i] = Math.pow(1 - t / TR, 1.5); }
  const pg = new T.BufferGeometry(); pg.setAttribute("position", new T.BufferAttribute(pp, 3)); pg.setAttribute("aS", new T.BufferAttribute(aS, 1)); pg.setAttribute("aA", new T.BufferAttribute(aA, 1));
  const pu = new T.Points(pg, pm(0xcffff4, 1, .9, { defines: { PU: "" } })); pu.frustumCulled = false; g.add(pu);
  const nxt = () => { const a = R() < .65 ? trunk : paths; return a[R() * a.length | 0]; };
  const pl = Array.from({ length: MP }, () => { const p = nxt(); return { p, s: R() * (p.length - 2), v: .18 + R() * .3 }; });
  const stepP = () => { pl.forEach((o, k) => { o.s += o.v; if (o.s >= o.p.length - 1) { o.p = nxt(); o.s = 0; } for (let t = 0; t < TR; t++) { const s = Math.max(0, o.s - t * .8), i = Math.min(s | 0, o.p.length - 2), f = s - i, a = o.p[i] * 3, b = o.p[i + 1] * 3, q = (k * TR + t) * 3; for (let c = 0; c < 3; c++) pp[q + c] = pa[a + c] + (pa[b + c] - pa[a + c]) * f; } }); pg.attributes.position.needsUpdate = true; };

  // floor rings + a scanner ring sweeping up the body
  const ring = (rad, k) => Array.from({ length: k }, (_, i) => V(Math.cos(i / k * 6.283) * rad, -4.5, Math.sin(i / k * 6.283) * rad));
  g.add(new T.Points(new T.BufferGeometry().setFromPoints([...ring(2.4, 100), ...ring(3.2, 140)]), pm(0x2dd4bf, .07, .7)));
  const sr = new T.LineLoop(new T.BufferGeometry().setFromPoints(ring(W * .85, 90).map((p) => (p.y = 0, p))), lm(0x8ff0dc, .6)); g.add(sr);

  const mix = new T.AnimationMixer(m), clip = gl.animations.find((a) => a.name == "idle") || gl.animations[0]; clip && mix.clipAction(clip).play();
  const upd = () => {
    ginv.copy(g.matrixWorld).invert(); BL.forEach((b, i) => M[i].multiplyMatrices(ginv, b.matrixWorld));
    for (let i = 0; i < n; i++) { const e = M[B[i]].elements, x = L[i * 3], y = L[i * 3 + 1], z = L[i * 3 + 2]; pa[i * 3] = e[0] * x + e[4] * y + e[8] * z + e[12]; pa[i * 3 + 1] = e[1] * x + e[5] * y + e[9] * z + e[13]; pa[i * 3 + 2] = e[2] * x + e[6] * y + e[10] * z + e[14]; }
    pos.needsUpdate = true;
  };
  const size = () => { const w = el.clientWidth, h = el.clientHeight; r.setSize(w, h, false); r.domElement.style.cssText += "width:100%;height:100%"; cam.aspect = w / h; cam.updateProjectionMatrix(); g.position.x = w > 900 ? 3.6 : 0; g.scale.setScalar(w < 600 ? .75 : 1); U.k.value = r.domElement.height * 1.0723; };
  const ro = new ResizeObserver(size); ro.observe(el); size();
  let vis = true, raf, ty = 0, last = performance.now(); const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting)); io.observe(el);
  const mv = (e) => (ty = e.clientY / innerHeight - .5); addEventListener("pointermove", mv, { passive: true });
  const frame = (dt) => { mix.update(dt); U.t.value += dt; g.updateMatrixWorld(true); upd(); stepP(); const u = (U.t.value * .12) % 1; sr.position.y = -4.5 + 9 * u; sr.material.opacity = .6 * Math.sin(u * Math.PI); r.render(sc, cam); };
  const loop = (now) => { raf = requestAnimationFrame(loop); const dt = Math.min((now - last) / 1000, .05); last = now; if (!vis || document.hidden) return; g.rotation.y -= .006 * dt * 60; g.rotation.x += (ty * .2 - g.rotation.x) * .04; frame(dt); };
  if (calm) { g.rotation.y = -.5; frame(0); } else loop(last); requestAnimationFrame(() => (r.domElement.style.opacity = 1));
  return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener("pointermove", mv); sc.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); }); r.dispose(); r.domElement.remove(); };
}

function realBody(T, el, lite) {
  let stop = () => { }, dead = false;
  const fb = () => { if (!dead) stop = lite(); }, tryLoad = (i) => {
    if (i >= MODELS.length) return fb();
    try { new T.GLTFLoader().load(MODELS[i], (gl) => { if (dead) return; try { stop = build(T, el, gl); } catch (e) { console.warn(e); fb(); } }, undefined, () => tryLoad(i + 1)); } catch { fb(); }
  };
  tryLoad(0);
  return () => { dead = true; stop(); };
}

/* ═══ STYLES ═══ */
const CSS = `
:root{--ink:#241f6b;--deep:#17134a;--teal:#2bb5a0;--mint:#8ff0dc;--sky:#eef3fa;--vio:#8b8bf7}
html{scroll-behavior:smooth}
.mx{font-family:'Manrope',system-ui,sans-serif;color:#2a2f4a;background:#fff;opacity:0;transition:opacity .6s}.mx.on{opacity:1}
.mx h1,.mx h2,.mx h3{color:var(--ink)}.mx .dk h1,.mx .dk h2,.mx .dk h3{color:#fff}
section[id]{scroll-margin-top:70px}
.t-teal{color:var(--teal)}.t-mint{color:var(--mint)}.bg-sky{background:var(--sky)}.bg-deep{background:var(--deep)}
.btn{display:inline-flex;align-items:center;gap:.6rem;font-weight:700;font-size:.85rem;border-radius:999px;padding:.8rem 1.4rem;transition:transform .25s,box-shadow .25s,background .25s}.btn:hover{transform:translateY(-2px)}
.btn-p{background:#e4266f;color:#fff;box-shadow:0 10px 24px -10px rgba(228,38,111,.7)}
.btn-t{background:var(--teal);color:#fff}.btn-w{background:#fff;color:var(--ink)}
.rv{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.7,.2,1) var(--d,0s),transform .9s cubic-bezier(.2,.7,.2,1) var(--d,0s)}.rv.in{opacity:1;transform:none}
.card{background:#fff;border-radius:1.4rem;box-shadow:0 18px 50px -22px rgba(36,31,107,.28);transition:transform .35s,box-shadow .35s;position:relative;overflow:hidden}.card:hover{transform:translateY(-6px)}
.card:before{content:"";position:absolute;inset:0;background:radial-gradient(380px circle at var(--x,50%) var(--y,0),rgba(43,181,160,.14),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}.card:hover:before{opacity:1}
.ph{background:repeating-linear-gradient(45deg,#e6edf6,#e6edf6 12px,#f1f5fb 12px,#f1f5fb 24px);border:2px dashed #b8c4d6}
.frame{border-radius:1.8rem;overflow:hidden;box-shadow:18px 22px 50px -18px rgba(36,31,107,.35)}
.dots{background-image:radial-gradient(#cdd8e8 2px,transparent 2px);background-size:22px 22px}
.tab{padding:.6rem 1.3rem;border-radius:999px;font-size:.85rem;font-weight:600;white-space:nowrap;transition:background .25s,color .25s;color:#4a506e}.tab.on{background:var(--teal);color:#fff}
.tri{clip-path:polygon(0 100%,0 0,100% 100%);background:#e4266f}
@keyframes pu{0%,100%{box-shadow:0 0 0 0 rgba(43,181,160,.55)}50%{box-shadow:0 0 0 10px rgba(43,181,160,0)}}.pu{animation:pu 2.4s infinite}
.noscroll::-webkit-scrollbar{display:none}.noscroll{scrollbar-width:none}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.pu{animation:none}}
`;

/* ═══ PAGE ═══ */
export default function Page() {
  const [ok, setOk] = useState(false), [menu, setMenu] = useState(false), [act, setAct] = useState("about");
  const hero = useRef();

  useEffect(() => {
    document.title = "MaxRehab — Advanced Neurorehabilitation Center | Dehri on Sone, Bihar";
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .1 });
    document.querySelectorAll(".rv").forEach((n) => io.observe(n));
    const ids = TABS.map((t) => t[1]);
    const sc = () => { let a = ""; ids.forEach((i) => { const el = document.getElementById(i); if (el && el.getBoundingClientRect().top <= 140) a = i; }); setAct(a); };
    const mv = (e) => { const s = e.target.closest?.(".card"); if (s) { const b = s.getBoundingClientRect(); s.style.setProperty("--x", e.clientX - b.left + "px"); s.style.setProperty("--y", e.clientY - b.top + "px"); } };
    addEventListener("scroll", sc, { passive: true }); addEventListener("pointermove", mv, { passive: true });
    const t = setTimeout(() => setOk(true), 2500);
    return () => { io.disconnect(); removeEventListener("scroll", sc); removeEventListener("pointermove", mv); clearTimeout(t); };
  }, []);

  useEffect(() => { // lazy 3D body — idle only
    if (navigator.connection?.saveData) return;
    let stop = () => { }, dead = false;
    const go = () => load(THREE_SRC).then(() => { const T = window.THREE, el = hero.current, lite = () => bodyLite(T, el); if (dead || !T || !el) return; return load(LOADER_SRC).then(() => { if (!dead) stop = realBody(T, el, lite); }, () => { if (!dead) stop = lite(); }); }).catch(() => { });
    const id = window.requestIdleCallback ? requestIdleCallback(go, { timeout: 2500 }) : setTimeout(go, 1200);
    return () => { dead = true; stop(); window.cancelIdleCallback?.(id); };
  }, []);

  const ld = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: C.name,
    alternateName: "MaxRehab",
    logo: "https://maxrehab.in/fulllogo.png",
    image: "https://maxrehab.in/fulllogo.png",
    medicalSpecialty: "Physiotherapy",
    telephone: C.phone,
    email: C.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Canal Rd, Rajputana Mohalla",
      addressLocality: "Dehri on Sone",
      addressRegion: "Bihar",
      postalCode: "821307",
      addressCountry: "IN"
    },
    openingHours: "Mo-Sa 10:00-20:00"
  };
  const ask = (t) => waLink(`Hello MaxRehab, ${t}`);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" onReady={() => setOk(true)} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <main className={`mx ${ok ? "on" : ""} antialiased overflow-x-hidden`} id="top">
        {/* utility bar */}
        <div className="bg-deep text-white text-[11px] font-bold tracking-wider uppercase">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center">
            {TOP.map(([l, h], i) => <a key={h} href={`#${h}`} className={`py-2.5 hover:bg-white/10 transition ${i == 3 ? "bg-[#2bb5a0]" : ""} ${i > 1 ? "hidden md:block" : ""}`}>{l}</a>)}
          </div>
        </div>

        {/* header */}
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-3 md:py-4 flex items-center justify-between relative">
            {/* Left side on desktop: Dept / Clinic info */}
            <div className="hidden lg:flex items-center gap-3 w-1/4">
              <span className="text-xs text-slate-500 leading-tight">
                <span className="font-bold text-[#241f6b] block text-[13px]">Neuro Rehabilitation</span>
                Dehri on Sone, Bihar
              </span>
            </div>

            {/* Centered Large Logo */}
            <div className="flex-1 flex justify-center items-center py-1">
              <a href="#top" className="flex items-center justify-center group" aria-label="MaxRehab Advanced Neurorehabilitation Center Home">
                <img
                  src={IMG.logo}
                  alt="MaxRehab Advanced Neurorehabilitation Center"
                  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>

            {/* Right side: Phone & Appointment Button */}
            <div className="flex items-center justify-end gap-3 w-auto lg:w-1/4">
              <a href={`tel:${C.phone.replace(/\s/g, "")}`} className="hidden md:flex items-center gap-2 text-sm font-bold text-[#241f6b] bg-slate-50 px-3.5 py-2 rounded-full border border-slate-200/70 hover:border-[#2bb5a0] transition">
                <Ico n="ph" c="w-4 h-4 t-teal" />
                <span>{C.phone}</span>
              </a>
              <a href="#contact" className="hidden sm:inline-flex btn btn-p !py-2 !px-4 !text-xs shadow-md">Book Appointment</a>
              <button aria-label="Menu" onClick={() => setMenu(!menu)} className="md:hidden p-2 text-[#241f6b]">
                <Ico n={menu ? "x" : "menu"} />
              </button>
            </div>
          </div>

          {/* Centered Navigation Menu */}
          <nav className={`${menu ? "grid" : "hidden"} md:flex max-w-6xl mx-auto px-5 md:px-10 md:justify-center md:gap-8 pb-3 md:pb-2.5 pt-1 text-sm font-semibold text-slate-600 border-t border-slate-100`}>
            {NAV.map(([l, h]) => (
              <a key={h} href={`#${h}`} onClick={() => setMenu(false)} className="py-2 md:py-0 hover:text-[#2bb5a0] transition text-center">
                {l}
              </a>
            ))}
          </nav>
        </header>

        {/* title banner (3D nerve-body on the right) */}
        <section className="dk relative bg-deep overflow-hidden min-h-[420px] md:min-h-[540px] flex items-center" style={{ background: "linear-gradient(100deg,#241f6b,#17134a 70%)" }}>
          <div ref={hero} className="absolute inset-0" aria-hidden />
          <div className="absolute bottom-0 left-0 w-28 h-14 tri opacity-90" />
          <div className="relative max-w-6xl mx-auto px-5 md:px-10 w-full py-14 pointer-events-none">
            <p className="rv text-xs font-bold tracking-[.25em] uppercase t-mint mb-3">MaxRehab · Advanced Neurorehabilitation Center</p>
            <h1 className="rv text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase leading-tight max-w-xl" style={{ "--d": ".1s" }}>Advanced<br />Neurorehabilitation<br /><span className="font-bold">Center</span></h1>
          </div>
        </section>

        {/* breadcrumb + intro */}
        <section className="px-5 md:px-10 pt-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs text-slate-500"><a href="#top" className="underline">Home</a> › <a href="#about" className="underline">MaxRehab</a> › Advanced Neurorehabilitation</p>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-8">
              <div className="rv">
                <H2 a="Advanced Neuro Rehabilitation" b="& Physiotherapy" c="!text-4xl" />
                <p className="mt-6 text-[15px] leading-relaxed text-slate-600">MaxRehab Advanced Neurorehabilitation Center is a specialized centre dedicated entirely to individuals recovering from stroke, brain injury, spinal cord trauma, and complex neurological disorders. Every rehabilitation plan is spearheaded by experienced neuro-physiotherapists and structured around concrete, achievable functional milestones.</p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">We integrate evidence-based neurological physiotherapy, occupational re-training, speech therapy, and caregiver education to rebuild independence, restore motor pathways, and enhance quality of life.</p>
                <div className="flex flex-wrap items-center gap-5 mt-8">
                  <Btn href={ask("I'd like to request a consultation.")}>Request Consultation <Ico n="arr" c="w-4 h-4" /></Btn>
                  <a href={VIDEO || "#about"} target={VIDEO ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 text-sm font-semibold text-slate-600"><span className="w-10 h-10 rounded-full border-2 border-[#2bb5a0] t-teal grid place-items-center"><Ico n="play" c="w-3.5 h-3.5" /></span>Watch our video</a>
                </div>
                <div className="flex gap-3 mt-8">
                  <a aria-label="Call" href={`tel:${C.phone.replace(/\s/g, "")}`} className="w-10 h-10 rounded-full border border-pink-300 text-pink-500 grid place-items-center"><Ico n="ph" c="w-4 h-4" /></a>
                  <a aria-label="WhatsApp" href={ask("I want to know more.")} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-pink-300 text-pink-500 grid place-items-center"><Ico n="arr" c="w-4 h-4" /></a>
                </div>
              </div>
              <div className="rv frame" style={{ "--d": ".15s" }}><Img k="hero" label="Intro photo · 4:3" className="w-full aspect-[4/3]" /></div>
            </div>
          </div>
        </section>

        {/* sticky tabs */}
        <div className="sticky top-0 z-40 px-3 py-3 pointer-events-none">
          <div className="noscroll pointer-events-auto max-w-fit mx-auto bg-white/95 backdrop-blur rounded-full shadow-xl p-1.5 flex overflow-x-auto max-w-full border border-slate-100">
            {TABS.map(([l, h]) => <a key={h} href={`#${h}`} className={`tab ${act === h ? "on" : ""}`}>{l}</a>)}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="bg-sky relative overflow-hidden px-5 md:px-10 py-20 md:py-24">
          <Ring c="-right-40 bottom-0 hidden md:block" />
          <div className="max-w-6xl mx-auto relative">
            <div className="rv"><H2 a="Personalized Neurological" b="Rehabilitation" /></div>
            <div className="rv mt-8 grid gap-5 max-w-4xl text-[15px] leading-relaxed text-slate-600">
              <p>A neurological injury or illness can change how a person moves, communicates and manages daily life. Rehabilitation addresses these changes through a programme tailored to the individual's condition, abilities and priorities.</p>
              <p>The rehabilitation team develops goals together with patients and their families, combining therapies according to each person's needs. Care may include physical rehabilitation, pain management, emotional support and help preparing for a return to home or work. After discharge, we continue with home programmes and follow-up.</p>
              <p>A case manager helps coordinate communication between the patient, family and professionals involved in treatment.</p>
              <p className="italic text-slate-500">For patients travelling from other districts or states, medical records can be reviewed by our team before arrival to assess the condition and the suitability of the available programmes. The rehabilitation plan is then set after an individual assessment.</p>
            </div>
          </div>
        </section>

        {/* CONDITIONS */}
        <section id="conditions" className="px-5 md:px-10 py-20 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="rv"><H2 a="Conditions" b="We Treat" /><p className="mt-4 text-[15px] text-slate-600">The centre provides rehabilitation for people with a wide range of neurological injuries and conditions, including:</p></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {CONDS.map(([t, l], i) => (
                <div key={t} className="rv card p-7" style={{ "--d": `${(i % 3) * .1}s` }}>
                  <h3 className="font-bold text-[15px]">{t}</h3>
                  <ul className="mt-3 grid gap-1.5 text-sm text-slate-500">{l.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="rv mt-10 text-[15px] text-slate-600 max-w-4xl">The rehabilitation plan depends on how the condition affects the individual's function and daily life. Patients may need support after a recent injury or illness, or help managing the ongoing effects of a neurological condition.</p>
          </div>
        </section>

        {/* SPINAL CORD INJURY */}
        <section id="sci" className="bg-sky relative overflow-hidden px-5 md:px-10 py-20 md:py-24">
          <div className="dots absolute right-0 top-0 w-1/2 h-72 opacity-70 hidden md:block" />
          <div className="max-w-6xl mx-auto relative">
            <div className="rv"><H2 a="Spinal Cord" b="Injury" /><h3 className="font-bold text-2xl mt-10">Spinal Cord Injury Rehabilitation</h3></div>
            <div className="rv mt-5 grid gap-4 max-w-4xl text-[15px] leading-relaxed text-slate-600">
              <p>Our spinal cord injury programme is a focused service within MaxRehab Advanced Neurorehabilitation Center, delivered by a multidisciplinary team. It supports people with injuries to the spinal cord from accident, disease or surgery.</p>
              <p>Treatment is shaped around the patient's remaining abilities and goals, with an emphasis on improving function and supporting daily activity.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-4xl">
              {SCI.map(([t, d], i) => (
                <div key={t} className="rv" style={{ "--d": `${(i % 2) * .1}s` }}>
                  <h3 className="font-extrabold uppercase text-[15px] tracking-wide">{t}</h3>
                  <p className="text-[15px] text-slate-600 mt-2 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="rv mt-8 text-sm text-slate-500 max-w-4xl">Eligibility for any technique is decided after an individual clinical assessment; outcomes vary by patient.</p>
          </div>
        </section>

        {/* THERAPIES & SUPPORT */}
        <section id="therapies" className="relative overflow-hidden px-5 md:px-10 py-20 md:py-24">
          <Ring c="-right-44 top-1/3 hidden lg:block" />
          <div className="max-w-6xl mx-auto relative">
            <div className="rv"><H2 a="Rehabilitation Therapies" b="and Support" /><p className="mt-4 text-[15px] text-slate-600 max-w-3xl">Patients receive a combination of therapies selected for their needs. These services address movement, daily activities, communication, cognitive difficulties and emotional adjustment.</p></div>
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 mt-12 items-start">
              <div className="grid gap-9">
                {THER.map(([t, d]) => <div key={t} className="rv"><h3 className="font-bold text-2xl">{t}</h3><p className="text-[15px] text-slate-600 mt-2 leading-relaxed">{d}</p></div>)}
              </div>
              <div className="rv frame lg:sticky lg:top-24"><Img k="therapy" label="Therapy photo · 4:5" className="w-full aspect-[4/5]" /></div>
            </div>
            <div className="rv mt-16 card !rounded-[2rem] grid md:grid-cols-2 hover:!translate-y-0">
              <Img k="pool" label="Hydrotherapy photo · 3:2" className="w-full h-full min-h-[260px] !border-0 !rounded-none" />
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-xs font-bold tracking-[.22em] uppercase t-teal">Aquatic therapy</p>
                <h3 className="text-3xl font-bold mt-2">Hydrotherapy for neurological recovery</h3>
                <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">A therapist works one-to-one with the patient in the pool, using the water's buoyancy to support weak limbs and its resistance to build strength, balance and walking confidence — with far less strain on joints and a lower fear of falling.</p>
                <ul className="mt-5 grid gap-2 text-sm text-slate-600">{["Safer early standing and gait practice", "Eases stiffness and spasticity", "Builds balance, trunk control and endurance"].map((x) => <li key={x} className="flex gap-3 items-center"><span className="t-teal"><Ico n="chk" c="w-4 h-4" /></span>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANCED TECHNOLOGIES */}
        <section id="tech" className="bg-sky relative overflow-hidden px-5 md:px-10 py-20 md:py-24">
          <div className="max-w-6xl mx-auto relative">
            <div className="rv"><H2 a="Advanced" b="Technologies" /><p className="mt-4 text-[15px] text-slate-600 max-w-3xl">Alongside hands-on therapy, our team uses specialised technology to support movement and strength training.</p></div>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {TECH.map(([t, k, d], i) => (
                <div key={t} className="rv card" style={{ "--d": `${i * .12}s` }}>
                  <Img k={k} label={t} className="w-full aspect-[16/10] !border-0 !rounded-none" />
                  <div className="p-7"><h3 className="font-bold text-xl">{t}</h3><p className="text-[15px] text-slate-600 mt-3 leading-relaxed">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section id="team" className="px-5 md:px-10 py-20 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="rv"><H2 a="Department" b="Leadership" /></div>
            <div className="rv grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-center mt-12">
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                <span className="absolute -right-3 -bottom-3 w-full h-full rounded-full border-[10px] border-[#e4266f]/70" />
                <Img k="doctor" label="Doctor portrait · square" className="relative w-full h-full !rounded-full" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">{DOC[0]}</h3>
                <p className="font-bold text-sm mt-2">{DOC[1]}</p>
                <p className="text-[15px] text-slate-600 mt-4 leading-relaxed max-w-2xl">{DOC[2]}</p>
                <a href={ask("I'd like to know more about Dr. Prem Prakash.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold t-teal mt-5"><span className="w-6 h-6 rounded-full bg-[#2bb5a0] text-white grid place-items-center"><Ico n="arr" c="w-3 h-3" /></span>Read More</a>
              </div>
            </div>
          </div>
        </section>

        {/* REQUEST A CONSULTATION */}
        <section id="contact" className="dk relative overflow-hidden" style={{ background: "linear-gradient(110deg,#241f6b,#17134a)" }}>
          <i aria-hidden className="absolute -right-24 -top-24 w-96 h-96 rounded-full border-[44px] border-white/10" />
          <div className="max-w-6xl mx-auto grid md:grid-cols-[.8fr_1fr] gap-10 items-center px-5 md:px-10 py-16 md:py-0 relative">
            <div className="rv md:py-14"><Img k="cta" label="Team / patient photo · 4:5" className="w-full aspect-[4/5] md:aspect-auto md:h-[460px] !rounded-3xl" /></div>
            <div className="rv text-white md:py-14" style={{ "--d": ".1s" }}>
              <h2 className="text-4xl md:text-5xl !text-white"><b className="font-bold">Request a</b> <span className="t-mint font-light">consultation</span></h2>
              <p className="mt-5 text-[15px] text-white/75 leading-relaxed">MaxRehab Advanced Neurorehabilitation Center provides personalised neuro-rehabilitation for patients from Dehri on Sone, Sasaram, Aurangabad, and across Rohtas and Bihar. We welcome every case, from the common to the most challenging, and our team works together to design a plan for your recovery.</p>
              <p className="mt-4 text-[15px] font-bold">Send an enquiry and a MaxRehab coordinator will contact you shortly:</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Btn href={ask("I am a new patient and would like a consultation.")}>New Patient <Ico n="arr" c="w-4 h-4" /></Btn>
                <Btn href={ask("I am a current patient and have a query.")} v="t">Current & Returning Patients <Ico n="arr" c="w-4 h-4" /></Btn>
                <Btn href={ask("I would like to refer a patient.")} v="w">Refer a Patient <Ico n="arr" c="w-4 h-4" /></Btn>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-10 text-sm text-white/80">
                <span><b className="t-mint block text-[11px] uppercase tracking-widest">Call</b>{C.phone}</span>
                <span><b className="t-mint block text-[11px] uppercase tracking-widest">Email</b>{C.email}</span>
                <span><b className="t-mint block text-[11px] uppercase tracking-widest">Hours</b>{C.hours}</span>
                <span><b className="t-mint block text-[11px] uppercase tracking-widest">Visit</b>{C.addr} · <a href={C.map} target="_blank" rel="noreferrer" className="underline">Directions</a></span>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="bg-[#0f0c33] text-white/70 px-5 md:px-10 pt-16 pb-10 text-sm border-t border-white/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Logo & About */}
            <div className="md:col-span-5 space-y-4">
              <a href="#top" className="inline-block bg-white px-5 py-2.5 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]">
                <img
                  src={IMG.logo}
                  alt="MaxRehab Advanced Neurorehabilitation Center"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </a>
              <h3 className="text-white font-bold text-lg pt-1">MaxRehab Advanced Neurorehabilitation Center</h3>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-md">
                Pioneering comprehensive neurological recovery in Dehri on Sone. Specialized care for stroke rehabilitation, spinal cord injuries, brain injury, Parkinson's disease, and pediatric neuro-rehabilitation.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8ff0dc]">Quick Links</h4>
              <ul className="space-y-2 text-xs md:text-sm text-white/70">
                {NAV.map(([l, h]) => (
                  <li key={h}>
                    <a href={`#${h}`} className="hover:text-[#2bb5a0] transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact & Location */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8ff0dc]">Contact & Clinic</h4>
              <div className="space-y-2 text-xs md:text-sm text-white/70">
                <p className="flex items-start gap-2">
                  <span className="font-bold text-white min-w-[55px]">Address:</span>
                  <span>{C.addr}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-white min-w-[55px]">Phone:</span>
                  <a href={`tel:${C.phone.replace(/\s/g, "")}`} className="hover:text-[#8ff0dc] transition">{C.phone}</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-white min-w-[55px]">Email:</span>
                  <a href={`mailto:${C.email}`} className="hover:text-[#8ff0dc] transition">{C.email}</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-white min-w-[55px]">Hours:</span>
                  <span>{C.hours}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <span>© {new Date().getFullYear()} {C.name}. All rights reserved.</span>
            <span className="text-center md:text-right max-w-xl">
              Emergency Notice: In case of acute medical emergencies such as stroke onset, please visit the nearest hospital or call 108 immediately. Website information does not replace medical advice.
            </span>
          </div>
        </footer>

        <a href={waLink("Hello MaxRehab, I need help.")} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-50 btn btn-t pu !py-3.5 shadow-2xl"><Ico n="ph" />Chat</a>
      </main>
    </>
  );
}