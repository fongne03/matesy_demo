import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  primary:       '#D4694A',
  primaryLight:  '#FAEAE4',
  primaryDark:   '#B85538',
  secondary:     '#5E9B70',
  secondaryLight:'#E4F0E8',
  accent:        '#F0AC3C',
  accentLight:   '#FEF4DC',
  bg:            '#FAF5EE',
  bgAlt:         '#F2EBE0',
  card:          '#FFFFFF',
  text:          '#261510',
  muted:         '#8C6B5A',
  border:        '#E8D4C0',
  info:          '#4A8EA8',
  infoLight:     '#E0EEF5',
  purple:        '#7B65B8',
  purpleLight:   '#EDE8F8',
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const PROPERTIES = [
  { id:1, title:'Sunny Double Room',      area:'Hackney, London',       price:850, rooms:3, bills:true,  match:94, emoji:'☀️', col:'#F5EDD4' },
  { id:2, title:'Cosy Studio Share',      area:'Hyde Park, Leeds',      price:520, rooms:2, bills:true,  match:87, emoji:'🌿', col:'#D8EDD8' },
  { id:3, title:'Modern Flat Share',      area:'Ancoats, Manchester',   price:680, rooms:4, bills:true,  match:91, emoji:'🏙️', col:'#D4E4EE' },
  { id:4, title:'Victorian House Room',   area:'Leith, Edinburgh',      price:590, rooms:3, bills:false, match:82, emoji:'🏛️', col:'#EDD4E0' },
  { id:5, title:'Canal Side Room',        area:'Digbeth, Birmingham',   price:620, rooms:5, bills:true,  match:78, emoji:'🚣', col:'#E8E4D0' },
  { id:6, title:'Bright Top Floor Flat',  area:'Meadowbank, Edinburgh', price:720, rooms:2, bills:false, match:85, emoji:'🌤️', col:'#E0D8EE' },
];

const FLATMATES = [
  { id:1, name:'Priya',  age:22, emoji:'🌺', city:'London',     match:94, traits:['Early bird 🐦','Vegan 🌱','Student 📚'],         bio:"MSc at UCL. Love cooking, yoga & cosy nights in. Looking for kind, respectful housemates!",        col:'#F5EDD4' },
  { id:2, name:'Tom',    age:27, emoji:'🎧', city:'Manchester', match:88, traits:['Night owl 🦉','Remote work 💻','Music 🎵'],        bio:"Freelance designer working remotely. Chill, tidy, love hosting movie nights on weekends.",          col:'#D4E4EE' },
  { id:3, name:'Sofia',  age:24, emoji:'🧘', city:'Leeds',      match:91, traits:['Clean home 🧹','Cat mum 🐱','Foodie 🍜'],          bio:"Nurse with irregular shifts. Super clean, quiet after 10pm. I have a cat called Mochi!",            col:'#D8EDD8' },
  { id:4, name:'James',  age:25, emoji:'🎸', city:'London',     match:79, traits:['Musician 🎸','Gym 💪','Sociable 🎉'],              bio:"Music teacher who plays in a band on weekends. Social but very respectful of quiet time.",           col:'#EDD4E0' },
];

const QUIZ_Q = [
  { q:'🌅 When do you usually wake up?',              opts:['Before 7am ⏰','7–9am ☕','9–11am 😴','After 11am 🦥'] },
  { q:'🏠 How often do you have guests over?',        opts:['All the time!','A few times a week','Occasionally','Rarely or never'] },
  { q:'🧹 How tidy do you keep your space?',          opts:['Immaculate always ✨','Tidy when needed','Organised chaos','What is tidy? 😅'] },
  { q:'🔊 What\'s your ideal home noise level?',     opts:['Music always on 🎵','Background vibes','Quiet most of the time','Silent sanctuary 🤫'] },
  { q:'🍳 How often do you cook at home?',            opts:['Daily chef 👨‍🍳','A few times a week','Occasionally','Takeaway is cooking 🍕'] },
];

const PERSONAS = [
  {
    name:'Maya', label:'Young UK Renter', emoji:'🎓', age:23, city:'Leeds', color:C.primary, light:C.primaryLight,
    intro:'A recent Leeds graduate navigating shared housing for the first time. Budget-conscious, wants compatible housemates, and values transparency and safety.',
    stages:[
      { stage:'Awareness',  icon:'👀', actions:'Sees Matesy ad on Instagram while frustrated with SpareRoom bidding wars and unreliable listings.', emotion:'😤 Frustrated', emotionBg:'#FDEEE8', pain:'Overwhelmed by volume of listings; no way to assess if housemates are compatible.', opp:'Targeted social ads at peak frustration — focus on "no more bad housemates."' },
      { stage:'Research',   icon:'🔍', actions:'Googles alternatives, reads App Store reviews, asks uni friends who have already used it.', emotion:'🤔 Curious', emotionBg:'#EAF0FE', pain:'Unsure whether personality-based matching actually delivers better results.', opp:'Testimonials + a 60-second demo video build rapid trust and credibility.' },
      { stage:'Sign Up',    icon:'✍️', actions:'Downloads app, completes profile and takes the personality quiz in under 12 minutes.', emotion:'😊 Hopeful', emotionBg:'#E8F8EC', pain:'Quiz feels lengthy — she wants to see match results immediately.', opp:'Show real-time match count growing as she completes each question.' },
      { stage:'Search',     icon:'🏠', actions:'Filters Leeds listings by £500–650/mo, bills included, within 30 mins of campus.', emotion:'🔍 Engaged', emotionBg:'#EAF0FE', pain:'Some listings appear outdated — unclear if rooms are still available.', opp:'Badge listings updated in last 24 hours to signal freshness and reliability.' },
      { stage:'Match',      icon:'🤝', actions:'Receives 3 high-compatibility flatmate suggestions. Messages 2 of them directly in-app.', emotion:'😃 Excited', emotionBg:'#FEF8E0', pain:'Feels nervous and unsure what to write to a complete stranger.', opp:'Icebreaker prompts reduce social friction and dramatically improve response rates.' },
      { stage:'Move In',    icon:'📦', actions:'Signs digital contract. Receives in-app deposit protection guide and tenancy checklist.', emotion:'🏠 Relieved', emotionBg:'#E8F8EC', pain:'Unsure about her legal rights or what to do if something goes wrong.', opp:'Built-in tenancy guide + move-in checklist = confidence at every step.' },
      { stage:'Living',     icon:'⭐', actions:'Rates her housemates, refers a friend to Matesy, and joins the local Leeds community group.', emotion:'✅ Happy', emotionBg:'#E8F8EC', pain:'Wants to expand her social circle beyond just her flat.', opp:'Local community events and neighbour meetups drive retention and referrals.' },
    ]
  },
  {
    name:'Priya', label:'International Student', emoji:'🌏', age:21, city:'London (from Mumbai)', color:C.purple, light:C.purpleLight,
    intro:'A postgrad from India arriving in London for the first time. Safety, cultural compatibility, and proximity to university are her top priorities — and she\'s searching from abroad.',
    stages:[
      { stage:'Awareness',  icon:'👀', actions:'UCL\'s housing office mentions Matesy in an orientation email. Friends who studied in the UK have used it.', emotion:'😰 Anxious', emotionBg:'#F4E0F4', pain:'Terrified of rental scams and unsafe landlords in a city she\'s never visited.', opp:'University partnership as a trusted referral channel builds immediate authority.' },
      { stage:'Research',   icon:'🔍', actions:'Researches the platform from Mumbai. Watches YouTube walkthroughs. Reads Reddit posts from Indian students.', emotion:'😟 Worried', emotionBg:'#F4E0F4', pain:'Cannot physically visit or verify properties from abroad.', opp:'Video tours + verified landlord badge make remote decision-making feel safe.' },
      { stage:'Sign Up',    icon:'✍️', actions:'Creates a verified profile, uploads student ID, and links her UCL email for student verification.', emotion:'🤔 Cautious', emotionBg:'#EAF0FE', pain:'Wants reassurance that every other user on the platform is also verified.', opp:'Tiered verification system — student badge, ID badge, landlord badge — builds layer of trust.' },
      { stage:'Search',     icon:'🏠', actions:'Filters listings by proximity to UCL, neighbourhood safety score, bills included, 12-month minimum.', emotion:'🔍 Methodical', emotionBg:'#EAF0FE', pain:'Doesn\'t know London boroughs — doesn\'t know which areas are safe or well-connected.', opp:'Neighbourhood safety guide + Tube commute calculator integrated into search results.' },
      { stage:'Match',      icon:'🤝', actions:'Matched with students from similar cultural backgrounds as well as welcoming UK-based flatmates.', emotion:'😊 Hopeful', emotionBg:'#E8F8EC', pain:'Anxious about language and cultural differences making it hard to fit in.', opp:'Cultural background indicators and shared-interests tags reduce compatibility anxiety.' },
      { stage:'Move In',    icon:'📦', actions:'Follows in-app step-by-step guide: deposit protection, inventory checklist, tenant rights overview.', emotion:'😮 Overwhelmed', emotionBg:'#FDEEE8', pain:'UK renting norms are very different from what she knows in India.', opp:'International student renting guide built into onboarding flow — in plain, clear language.' },
      { stage:'Living',     icon:'⭐', actions:'Joins the Matesy London student community. Attends a flatmate social event. Feels less isolated.', emotion:'🌟 Grateful', emotionBg:'#FEF8E0', pain:'High risk of loneliness and social isolation without a pre-existing local network.', opp:'Community meetups + study buddy matching feature drive long-term wellbeing and loyalty.' },
    ]
  },
  {
    name:'Tom', label:'Digital Nomad', emoji:'💻', age:29, city:'Currently: Manchester', color:C.info, light:C.infoLight,
    intro:'A freelance UX designer who relocates every 2–3 months. He needs flexibility above all else — fast WiFi, compatible flatmates who respect remote work, and month-to-month contracts.',
    stages:[
      { stage:'Awareness',  icon:'👀', actions:'Discovers Matesy in a popular Nomad List Reddit thread. Comparing alternatives like Airbnb and Spotahome.', emotion:'🤔 Curious', emotionBg:'#EAF0FE', pain:'Airbnb is far too expensive for shared living; traditional flat-share platforms lock in long leases.', opp:'Strong SEO + nomad community presence drives high-intent organic discovery.' },
      { stage:'Research',   icon:'🔍', actions:'Checks whether the platform supports monthly contracts and flexible move-out. Reads the feature page carefully.', emotion:'🧐 Evaluating', emotionBg:'#EAF0FE', pain:'Most flat-share platforms are built around 6–12 month tenancies — unusable for nomads.', opp:'Lead hero messaging with "stays from 1 month" specifically targeted at mobile renters.' },
      { stage:'Sign Up',    icon:'✍️', actions:'Connects LinkedIn profile, sets rolling start and end dates, and flags remote-friendly preferences during onboarding.', emotion:'⚡ Efficient', emotionBg:'#FEF8E0', pain:'Doesn\'t want to spend 20 minutes on onboarding — he\'s between projects and time is money.', opp:'Express onboarding track for nomad and short-term users — streamlined to under 5 minutes.' },
      { stage:'Search',     icon:'🏠', actions:'Applies filters: verified fast WiFi, co-working space within 10 min walk, month-to-month, fully furnished.', emotion:'🎯 Focused', emotionBg:'#FEF8E0', pain:'WiFi speed claims are often exaggerated or unverified by landlords.', opp:'Verified WiFi speed test badge on listings — real data from previous tenants.' },
      { stage:'Match',      icon:'🤝', actions:'Matched with short-term compatible housemates who also work remotely and have compatible daily schedules.', emotion:'😊 Pleased', emotionBg:'#E8F8EC', pain:'Wants to know housemates\' typical working hours to avoid noise or space conflicts.', opp:'Work schedule compatibility layer added to the matching algorithm.' },
      { stage:'Move In',    icon:'📦', actions:'Completes virtual check-in, signs digital inventory form, and activates a rolling monthly contract remotely.', emotion:'😃 Smooth', emotionBg:'#E8F8EC', pain:'Physical key handover can be a real logistical nightmare when arriving from another city.', opp:'Smart lock integration or keysafe code delivery via app on move-in day.' },
      { stage:'Living',     icon:'⭐', actions:'Reviews the property and reactivates his Matesy profile with saved preferences for the next city search.', emotion:'🔄 Ready', emotionBg:'#EAF0FE', pain:'Having to rebuild his entire search profile from scratch in each new city is exhausting.', opp:'Nomad Mode: preferences, verified status, and reviews carry seamlessly across cities.' },
    ]
  }
];

// ─── HELPERS ────────────────────────────────────────────────────────────────
function Chip({ label, active, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      padding:'6px 16px', borderRadius:100,
      border: active ? 'none' : `2px solid ${C.border}`,
      background: active ? (color||C.primary) : 'white',
      color: active ? 'white' : C.muted,
      fontFamily:'inherit', fontWeight:700, fontSize:13,
      cursor:'pointer', transition:'all 0.18s',
    }}>{label}</button>
  );
}

function Badge({ score }) {
  const bg    = score>=90 ? '#E2F5E8' : score>=80 ? '#FEF5E0' : '#FAEAE4';
  const color = score>=90 ? '#3A8A50' : score>=80 ? '#A07010' : C.primary;
  return <span style={{background:bg,color,padding:'3px 10px',borderRadius:100,fontWeight:800,fontSize:12}}>✨ {score}% match</span>;
}

function Section({ title, children, style }) {
  return (
    <div style={{ background:'white', borderRadius:20, padding:'24px 28px', border:`1px solid ${C.border}`, boxShadow:'0 2px 10px rgba(44,24,16,0.04)', ...style }}>
      {title && <h3 style={{ fontWeight:800, marginBottom:16, fontSize:16 }}>{title}</h3>}
      {children}
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const features = [
    { icon:'🧠', title:'AI Personality Matching',  desc:'Our quiz maps your habits and preferences to find truly compatible flatmates — not just whoever is available.', bg:C.primaryLight },
    { icon:'🔒', title:'Verified & Safe',           desc:'Every user is ID-verified. Landlords are screened too. Rent with confidence knowing everyone is who they say they are.', bg:C.secondaryLight },
    { icon:'💰', title:'Affordability First',       desc:'Filter by all-in budget with bills included. No hidden costs, no nasty surprises — just homes that work for your wallet.', bg:C.accentLight },
    { icon:'🌍', title:'Built for Every Renter',   desc:'Whether you\'re a UK grad, international student, or digital nomad, Matesy adapts to your timeline, needs, and city.', bg:C.infoLight },
  ];
  const steps = [
    { n:'01', title:'Take the quiz',      desc:'5 quick lifestyle questions to build your renter profile.' },
    { n:'02', title:'Set your search',    desc:'Choose city, budget, move date, and whether you need bills included.' },
    { n:'03', title:'Get matched',        desc:'We surface compatible flatmates and rooms, all in one place.' },
    { n:'04', title:'Move in happy',      desc:'Chat, view, sign digitally, and move in with confidence.' },
  ];
  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign:'center', padding:'64px 24px 72px', position:'relative', marginBottom:48 }}>
        <div style={{ background:`radial-gradient(ellipse at 50% 30%, ${C.primaryLight} 0%, ${C.bg} 65%)`, position:'absolute', inset:0, borderRadius:32 }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-block', background:C.accentLight, color:'#A07010', padding:'6px 18px', borderRadius:100, fontWeight:700, fontSize:13, marginBottom:22 }}>
            🏠 The UK's first personality-first rental platform
          </div>
          <h1 style={{ fontFamily:"'Fraunces', Georgia, serif", fontSize:54, fontWeight:700, lineHeight:1.15, marginBottom:18, color:C.text }}>
            Find your perfect home<br/>
            <span style={{ color:C.primary, fontStyle:'italic' }}>& flatmates</span> in one place
          </h1>
          <p style={{ fontSize:18, color:C.muted, maxWidth:540, margin:'0 auto 36px', lineHeight:1.65 }}>
            AI-powered matching for young renters, international students, and digital nomads. No more guesswork. No more bad housemates.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button style={{ background:C.primary, color:'white', border:'none', padding:'14px 34px', borderRadius:100, fontFamily:'inherit', fontWeight:800, fontSize:16, cursor:'pointer' }} onClick={() => setPage('onboard')}>Start matching for free →</button>
            <button style={{ background:'white', color:C.primary, border:`2px solid ${C.primary}`, padding:'14px 28px', borderRadius:100, fontFamily:'inherit', fontWeight:700, fontSize:16, cursor:'pointer' }} onClick={() => setPage('search')}>Browse places</button>
          </div>
          <p style={{ fontSize:13, color:C.muted, marginTop:18 }}>✅ Free to join &nbsp;·&nbsp; 🔒 ID verified &nbsp;·&nbsp; 💬 No spam</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:56 }}>
        {[['12,400+','Active renters'],['94%','Match satisfaction'],['48 hrs','Average time to match']].map(([n,l]) => (
          <div key={l} style={{ background:'white', borderRadius:20, padding:28, textAlign:'center', border:`1px solid ${C.border}` }}>
            <div style={{ fontFamily:"'Fraunces', Georgia, serif", fontSize:38, fontWeight:700, color:C.primary }}>{n}</div>
            <div style={{ color:C.muted, fontSize:14, fontWeight:600, marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:34, fontWeight:700, marginBottom:24, textAlign:'center' }}>Why renters love Matesy</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginBottom:64 }}>
        {features.map(f => (
          <div key={f.title} style={{ background:'white', borderRadius:20, padding:28, border:`1px solid ${C.border}`, boxShadow:'0 2px 12px rgba(44,24,16,0.05)', transition:'transform 0.18s, box-shadow 0.18s', cursor:'default' }}>
            <div style={{ width:52, height:52, background:f.bg, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:16 }}>{f.icon}</div>
            <h3 style={{ fontWeight:800, fontSize:17, marginBottom:8 }}>{f.title}</h3>
            <p style={{ color:C.muted, lineHeight:1.65, fontSize:14 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ background:`linear-gradient(135deg, ${C.primaryLight}, ${C.accentLight})`, borderRadius:24, padding:'48px 40px', marginBottom:64 }}>
        <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:34, fontWeight:700, marginBottom:40, textAlign:'center' }}>How it works</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
          {steps.map(s => (
            <div key={s.n} style={{ textAlign:'center' }}>
              <div style={{ width:48, height:48, background:C.primary, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:14, margin:'0 auto 14px' }}>{s.n}</div>
              <h4 style={{ fontWeight:800, marginBottom:6, fontSize:15 }}>{s.title}</h4>
              <p style={{ color:C.muted, fontSize:13, lineHeight:1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign:'center', padding:'20px 0 40px' }}>
        <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:34, fontWeight:700, marginBottom:12 }}>Ready to find your people?</h2>
        <p style={{ color:C.muted, marginBottom:28, fontSize:16 }}>Join 12,000+ renters who found their perfect flat through Matesy.</p>
        <button style={{ background:C.primary, color:'white', border:'none', padding:'14px 40px', borderRadius:100, fontFamily:'inherit', fontWeight:800, fontSize:16, cursor:'pointer' }} onClick={() => setPage('onboard')}>Create your free profile →</button>
      </div>
    </div>
  );
}

// ─── ONBOARD PAGE ───────────────────────────────────────────────────────────
function OnboardPage({ step, setStep, setPage }) {
  const [form, setForm] = useState({ name:'', email:'', age:'', city:'', budget:'', moveDate:'', type:'', bio:'' });
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const steps = [
    {
      title:"Welcome to Matesy! 👋",
      sub:"Let's start with the basics — this takes under 2 minutes.",
      fields:[
        {label:'Your first name', key:'name', ph:'e.g. Maya'},
        {label:'Email address',   key:'email', ph:'you@email.com', type:'email'},
        {label:'Age',             key:'age',   ph:'e.g. 23',       type:'number'},
      ]
    },
    {
      title:"Your renting needs 🏠",
      sub:"Tell us what you're looking for so we can find the right matches.",
      fields:[
        {label:'Target city',          key:'city',     ph:'e.g. Leeds, London, Manchester'},
        {label:'Max monthly budget (£)',key:'budget',   ph:'e.g. 650'},
        {label:'Ideal move date',      key:'moveDate', ph:'', type:'date'},
      ]
    },
    {
      title:"Almost there! ✨",
      sub:"Help potential flatmates get to know the real you.",
      fields:[
        {label:'I am a...', key:'type', ph:'', select:['Student 🎓','Young professional 💼','Digital nomad 💻','Other']},
        {label:'Write a short bio (optional)', key:'bio', ph:"e.g. Postgrad who loves cooking, hiking & cosy evenings. Looking for friendly, tidy housemates!", textarea:true},
      ]
    }
  ];

  const cur = steps[step]; const last = step===steps.length-1;

  return (
    <div style={{ maxWidth:520, margin:'0 auto' }}>
      <div style={{ display:'flex', gap:8, marginBottom:32 }}>
        {steps.map((_,i)=><div key={i} style={{ flex:1, height:5, borderRadius:3, background:i<=step?C.primary:C.border, transition:'background 0.3s' }}/>)}
      </div>
      <Section style={{ padding:'40px' }}>
        <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:28, fontWeight:700, marginBottom:8 }}>{cur.title}</h2>
        <p style={{ color:C.muted, marginBottom:28, fontSize:15 }}>{cur.sub}</p>
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {cur.fields.map(f=>(
            <div key={f.key}>
              <label style={{ fontWeight:700, fontSize:14, display:'block', marginBottom:8 }}>{f.label}</label>
              {f.textarea ? (
                <textarea value={form[f.key]} onChange={e=>upd(f.key,e.target.value)} placeholder={f.ph} rows={4}
                  style={{ width:'100%', padding:'12px 16px', border:`2px solid ${C.border}`, borderRadius:14, fontFamily:'inherit', fontSize:14, resize:'vertical', outline:'none' }}/>
              ) : f.select ? (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {f.select.map(o=>(
                    <button key={o} onClick={()=>upd(f.key,o)} style={{
                      padding:'12px', borderRadius:14, border:`2px solid ${form[f.key]===o?C.primary:C.border}`,
                      background:form[f.key]===o?C.primaryLight:'white', fontFamily:'inherit', fontWeight:700, fontSize:14,
                      cursor:'pointer', color:form[f.key]===o?C.primary:C.text, transition:'all 0.15s',
                    }}>{o}</button>
                  ))}
                </div>
              ) : (
                <input value={form[f.key]} onChange={e=>upd(f.key,e.target.value)} placeholder={f.ph} type={f.type||'text'}
                  style={{ width:'100%', padding:'12px 16px', border:`2px solid ${C.border}`, borderRadius:14, fontFamily:'inherit', fontSize:14, outline:'none', transition:'border-color 0.2s' }}/>
              )}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:32, alignItems:'center' }}>
          {step>0
            ? <button onClick={()=>setStep(s=>s-1)} style={{ background:'none', border:'none', color:C.muted, fontFamily:'inherit', fontWeight:700, cursor:'pointer', fontSize:15 }}>← Back</button>
            : <div/>
          }
          <button onClick={()=>last?setPage('quiz'):setStep(s=>s+1)}
            style={{ background:C.primary, color:'white', border:'none', padding:'12px 28px', borderRadius:100, fontFamily:'inherit', fontWeight:800, fontSize:15, cursor:'pointer' }}>
            {last ? 'Continue to personality quiz →' : 'Continue →'}
          </button>
        </div>
      </Section>
      <p style={{ textAlign:'center', color:C.muted, fontSize:13, marginTop:14 }}>Step {step+1} of {steps.length} · Your data is private & secure 🔒</p>
    </div>
  );
}

// ─── QUIZ PAGE ───────────────────────────────────────────────────────────────
function QuizPage({ step, setStep, answers, setAnswers }) {
  const done = step >= QUIZ_Q.length;

  const pick = (qIdx, ans) => {
    setAnswers(a=>({...a,[qIdx]:ans}));
    setTimeout(()=>setStep(s=>s+1), 350);
  };

  if (done) return (
    <div style={{ maxWidth:520, margin:'0 auto', textAlign:'center' }}>
      <Section style={{ padding:48 }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
        <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:32, fontWeight:700, marginBottom:12 }}>Your profile is ready!</h2>
        <p style={{ color:C.muted, marginBottom:28, lineHeight:1.65 }}>Based on your answers, we've built your renter profile and started finding compatible flatmates and properties for you.</p>
        <div style={{ background:C.primaryLight, borderRadius:16, padding:20, marginBottom:24, textAlign:'left' }}>
          <div style={{ fontWeight:800, color:C.primary, marginBottom:8, fontSize:15 }}>🌅 Your renter type: The Homebody Social</div>
          <p style={{ color:C.text, fontSize:14, lineHeight:1.65 }}>You love a peaceful, clean home but enjoy warm conversation and shared meals. You're best matched with people who respect quiet evenings but appreciate a friendly, welcoming atmosphere.</p>
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:28 }}>
          {['Early riser ☀️','Clean & tidy 🧹','Home cooking 🍳','Social butterfly 🦋'].map(t=>(
            <span key={t} style={{ background:C.bgAlt, padding:'6px 14px', borderRadius:100, fontSize:13, fontWeight:700 }}>{t}</span>
          ))}
        </div>
        <button style={{ background:C.primary, color:'white', border:'none', padding:'13px 32px', borderRadius:100, fontFamily:'inherit', fontWeight:800, fontSize:15, cursor:'pointer' }}>
          See my matches →
        </button>
      </Section>
    </div>
  );

  const q = QUIZ_Q[step];
  return (
    <div style={{ maxWidth:560, margin:'0 auto' }}>
      <div style={{ display:'flex', gap:6, marginBottom:10 }}>
        {QUIZ_Q.map((_,i)=><div key={i} style={{ flex:1, height:5, borderRadius:3, background:i<step?C.primary:i===step?C.accent:C.border, transition:'background 0.3s' }}/>)}
      </div>
      <p style={{ textAlign:'right', color:C.muted, fontSize:13, marginBottom:32 }}>{step+1} of {QUIZ_Q.length}</p>
      <Section style={{ padding:40 }}>
        <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:26, fontWeight:700, marginBottom:28, lineHeight:1.3 }}>{q.q}</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {q.opts.map(opt=>{
            const sel = answers[step]===opt;
            return (
              <button key={opt} onClick={()=>pick(step,opt)} style={{
                padding:'16px 14px', borderRadius:16,
                border:`2px solid ${sel?C.primary:C.border}`,
                background:sel?C.primaryLight:'white',
                cursor:'pointer', textAlign:'left',
                fontFamily:'inherit', fontWeight:700, fontSize:14,
                color:sel?C.primary:C.text, transition:'all 0.18s',
              }}>{opt}</button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

// ─── SEARCH PAGE ─────────────────────────────────────────────────────────────
function SearchPage() {
  const [query, setQuery]       = useState('');
  const [price, setPrice]       = useState(1000);
  const [city, setCity]         = useState('All');
  const [billsOnly, setBills]   = useState(false);
  const cities = ['All','London','Leeds','Manchester','Edinburgh','Birmingham'];

  const filtered = PROPERTIES.filter(p=>{
    const mc = city==='All' || p.area.includes(city);
    const mp = p.price <= price;
    const mb = !billsOnly || p.bills;
    const mq = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.area.toLowerCase().includes(query.toLowerCase());
    return mc && mp && mb && mq;
  });

  return (
    <div>
      <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:36, fontWeight:700, marginBottom:6 }}>Find your perfect place 🏠</h1>
      <p style={{ color:C.muted, marginBottom:28 }}>Browse rooms and flats matched to your budget and lifestyle.</p>

      {/* Search */}
      <div style={{ display:'flex', gap:12, marginBottom:16 }}>
        <div style={{ flex:1, position:'relative' }}>
          <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }}>🔍</span>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by area or property type..."
            style={{ width:'100%', padding:'12px 16px 12px 42px', border:`2px solid ${C.border}`, borderRadius:14, fontFamily:'inherit', fontSize:15, outline:'none', background:'white' }}/>
        </div>
        <button style={{ background:C.primary, color:'white', border:'none', padding:'0 24px', borderRadius:14, fontFamily:'inherit', fontWeight:800, cursor:'pointer' }}>Search</button>
      </div>

      {/* City chips */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
        {cities.map(c=><Chip key={c} label={c} active={city===c} onClick={()=>setCity(c)} />)}
      </div>

      {/* Filters */}
      <div style={{ background:'white', borderRadius:16, padding:'16px 20px', border:`1px solid ${C.border}`, marginBottom:28, display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, flex:1 }}>
          <span style={{ fontWeight:700, fontSize:14, whiteSpace:'nowrap' }}>Max budget:</span>
          <input type="range" min={400} max={1500} value={price} onChange={e=>setPrice(+e.target.value)} style={{ flex:1, accentColor:C.primary }} />
          <span style={{ fontWeight:800, color:C.primary, fontSize:16, whiteSpace:'nowrap', minWidth:80 }}>£{price}/mo</span>
        </div>
        <button onClick={()=>setBills(b=>!b)} style={{
          padding:'7px 16px', borderRadius:100, fontFamily:'inherit', fontWeight:700, fontSize:13, cursor:'pointer',
          border:`2px solid ${billsOnly?C.secondary:C.border}`, background:billsOnly?C.secondaryLight:'white', color:billsOnly?C.secondary:C.muted,
        }}>✅ Bills included only</button>
      </div>

      <p style={{ color:C.muted, fontSize:14, marginBottom:16 }}><strong style={{ color:C.text }}>{filtered.length} rooms</strong> found matching your criteria</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
        {filtered.map(p=>(
          <div key={p.id} style={{ background:'white', borderRadius:20, overflow:'hidden', border:`1px solid ${C.border}`, boxShadow:'0 2px 12px rgba(44,24,16,0.05)', cursor:'pointer', transition:'transform 0.18s, box-shadow 0.18s' }}>
            <div style={{ height:130, background:p.col, display:'flex', alignItems:'center', justifyContent:'center', fontSize:52 }}>{p.emoji}</div>
            <div style={{ padding:16 }}>
              <h3 style={{ fontWeight:800, fontSize:15, lineHeight:1.3, marginBottom:5 }}>{p.title}</h3>
              <p style={{ color:C.muted, fontSize:13, marginBottom:10 }}>📍 {p.area}</p>
              <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap' }}>
                <span style={{ background:C.bgAlt, padding:'3px 8px', borderRadius:8, fontSize:12, fontWeight:700 }}>🛏 {p.rooms} rooms</span>
                {p.bills && <span style={{ background:C.secondaryLight, color:C.secondary, padding:'3px 8px', borderRadius:8, fontSize:12, fontWeight:700 }}>✅ Bills incl.</span>}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontWeight:800, fontSize:18, color:C.primary }}>£{p.price}<span style={{ fontSize:12, color:C.muted, fontWeight:600 }}>/mo</span></span>
                <Badge score={p.match} />
              </div>
            </div>
          </div>
        ))}
        {filtered.length===0 && (
          <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'60px 0', color:C.muted }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🏠</div>
            <p style={{ fontWeight:700, fontSize:16 }}>No rooms match those filters.</p>
            <p style={{ fontSize:14 }}>Try adjusting your budget or city.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MATCH PAGE ───────────────────────────────────────────────────────────────
function MatchPage() {
  const [idx, setIdx]     = useState(0);
  const [liked, setLiked] = useState([]);
  const [anim, setAnim]   = useState(null); // 'like' | 'skip'

  const cur = FLATMATES[idx % FLATMATES.length];

  const act = (type) => {
    setAnim(type);
    if (type==='like') setLiked(l=>[...new Set([...l, cur.id])]);
    setTimeout(()=>{ setAnim(null); setIdx(i=>i+1); }, 320);
  };

  return (
    <div>
      <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:36, fontWeight:700, marginBottom:6 }}>Find your flatmates 🤝</h1>
      <p style={{ color:C.muted, marginBottom:32 }}>Connect with compatible housemates matched to your personality and lifestyle.</p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:32, alignItems:'start' }}>
        {/* Card */}
        <div style={{
          background:'white', borderRadius:28, border:`1px solid ${C.border}`,
          boxShadow:'0 8px 32px rgba(44,24,16,0.10)', overflow:'hidden',
          transform: anim==='like'?'rotate(4deg) translateX(30px)': anim==='skip'?'rotate(-4deg) translateX(-30px)':'none',
          opacity: anim ? 0 : 1, transition:'all 0.3s ease',
        }}>
          <div style={{ height:200, background:cur.col, display:'flex', alignItems:'center', justifyContent:'center', fontSize:88 }}>{cur.emoji}</div>
          <div style={{ padding:28 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
              <div>
                <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:28, fontWeight:700 }}>{cur.name}, {cur.age}</h2>
                <p style={{ color:C.muted, fontSize:14 }}>📍 {cur.city}</p>
              </div>
              <Badge score={cur.match} />
            </div>
            <p style={{ color:C.text, lineHeight:1.65, marginBottom:18, fontSize:15 }}>{cur.bio}</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
              {cur.traits.map(t=><span key={t} style={{ background:C.bgAlt, padding:'5px 12px', borderRadius:100, fontSize:13, fontWeight:700 }}>{t}</span>)}
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={()=>act('skip')} style={{ flex:1, padding:14, borderRadius:16, border:`2px solid ${C.border}`, background:'white', fontSize:20, cursor:'pointer', fontFamily:'inherit', fontWeight:700, color:C.muted }}>
                👋 Pass
              </button>
              <button onClick={()=>act('like')} style={{ flex:2, padding:14, borderRadius:16, border:'none', background:C.primary, color:'white', fontSize:15, fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>
                💛 Connect
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <Section title="Your connections 💛">
            {liked.length===0 ? (
              <div style={{ textAlign:'center', padding:'28px 0', color:C.muted }}>
                <div style={{ fontSize:36, marginBottom:8 }}>💫</div>
                <p style={{ fontSize:14 }}>Connect with someone to see them here!</p>
              </div>
            ) : FLATMATES.filter(f=>liked.includes(f.id)).map(f=>(
              <div key={f.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:44, height:44, background:f.col, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{f.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, fontSize:14 }}>{f.name}, {f.age}</div>
                  <div style={{ color:C.muted, fontSize:12 }}>📍 {f.city}</div>
                </div>
                <Badge score={f.match} />
              </div>
            ))}
            {liked.length>0 && <p style={{ fontSize:12, color:C.secondary, fontWeight:700, marginTop:10 }}>✅ {liked.length} connection{liked.length>1?'s':''} made!</p>}
          </Section>

          <div style={{ background:C.primaryLight, borderRadius:20, padding:'20px', border:`1px solid ${C.border}` }}>
            <div style={{ fontWeight:800, color:C.primary, marginBottom:12 }}>🔍 Match insights</div>
            <div style={{ fontSize:13, color:C.text, lineHeight:2 }}>
              <div>👥 <strong>{FLATMATES.length * 14}+</strong> flatmates in your area</div>
              <div>✨ <strong>3</strong> high matches (&gt;90%)</div>
              <div>💬 Avg response time: <strong>2 hours</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage() {
  const traits = ['Early riser ☀️','Clean & tidy 🧹','Home cooking 🍳','Friendly & social 🤗'];
  const prefs  = [['Target city','Leeds'],['Max budget','£650/mo'],['Move date','Sep 2025'],['Min stay','6 months'],['Bills included','Preferred'],['Furnished','Yes']];
  const verify = [['✅','Email address'],['✅','Mobile number'],['✅','Student ID'],['⏳','Right to Rent check']];

  return (
    <div style={{ maxWidth:680, margin:'0 auto' }}>
      <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:36, fontWeight:700, marginBottom:28 }}>Your Profile 👤</h1>

      {/* Profile card */}
      <div style={{ background:'white', borderRadius:24, overflow:'hidden', border:`1px solid ${C.border}`, boxShadow:'0 4px 24px rgba(44,24,16,0.07)', marginBottom:20 }}>
        <div style={{ height:110, background:`linear-gradient(135deg, ${C.primaryLight}, ${C.accentLight})` }}/>
        <div style={{ padding:'0 28px 28px' }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:16, marginTop:-38, marginBottom:16 }}>
            <div style={{ width:76, height:76, background:C.primary, borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:38, border:'4px solid white', flexShrink:0 }}>🌺</div>
            <div style={{ paddingBottom:6, flex:1 }}>
              <h2 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:24, fontWeight:700 }}>Maya Johnson</h2>
              <p style={{ color:C.muted, fontSize:14 }}>📍 Leeds &nbsp;·&nbsp; 23 years old &nbsp;·&nbsp; MSc Student 🎓</p>
            </div>
            <button style={{ background:'white', color:C.primary, border:`2px solid ${C.primary}`, padding:'8px 18px', borderRadius:100, fontFamily:'inherit', fontWeight:700, fontSize:13, cursor:'pointer', flexShrink:0 }}>Edit profile</button>
          </div>
          <div style={{ background:C.bgAlt, borderRadius:14, padding:'14px 16px', marginBottom:20, fontSize:14, lineHeight:1.65, color:C.text, fontStyle:'italic' }}>
            "Postgrad student who loves cooking, hiking, and cosy evenings in. Looking for tidy, friendly housemates in Leeds. Budget: £600–650/mo, available from September."
          </div>
          <div style={{ marginBottom:20 }}>
            <p style={{ fontWeight:700, fontSize:14, marginBottom:10 }}>Living style traits</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {traits.map(t=><span key={t} style={{ background:C.primaryLight, color:C.primary, padding:'6px 14px', borderRadius:100, fontSize:13, fontWeight:700 }}>{t}</span>)}
            </div>
          </div>
          <div style={{ background:`linear-gradient(135deg, ${C.primaryLight}, ${C.accentLight})`, borderRadius:16, padding:'16px 20px' }}>
            <div style={{ fontWeight:800, color:C.primary, marginBottom:6 }}>✨ Renter type: The Homebody Social</div>
            <p style={{ color:C.text, fontSize:14, lineHeight:1.6 }}>Clean, warm, and social. You love shared meals but value quiet evenings. Best matched with considerate, friendly flatmates who respect personal space.</p>
          </div>
        </div>
      </div>

      {/* Prefs */}
      <Section title="🏠 Housing preferences" style={{ marginBottom:20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {prefs.map(([l,v])=>(
            <div key={l} style={{ padding:'12px 16px', background:C.bgAlt, borderRadius:12 }}>
              <div style={{ color:C.muted, fontSize:12, fontWeight:600 }}>{l}</div>
              <div style={{ fontWeight:800, fontSize:15, marginTop:2 }}>{v}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Verification */}
      <Section title="🔒 Verification status">
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {verify.map(([ic,lab])=>(
            <div key={lab} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:ic==='✅'?C.secondaryLight:C.bgAlt, borderRadius:12 }}>
              <span style={{ fontSize:18 }}>{ic}</span>
              <span style={{ fontWeight:700, fontSize:14, color:ic==='⏳'?C.muted:C.text }}>{lab}</span>
              {ic==='⏳' && <span style={{ marginLeft:'auto', fontSize:12, color:C.muted, fontWeight:600 }}>Pending</span>}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── JOURNEY MAP ─────────────────────────────────────────────────────────────
function JourneyPage() {
  const [pIdx, setPIdx] = useState(0);
  const p = PERSONAS[pIdx];

  const emotionPalette = {
    '😤': '#FDEEE8', '😰': '#F4E0F4', '😟': '#F4E0F4', '🤔': '#EAF0FE',
    '🧐': '#EAF0FE', '😊': '#E8F8EC', '🔍': '#EAF0FE', '😃': '#FEF8E0',
    '⚡': '#FEF8E0', '🎯': '#FEF8E0', '🏠': '#E8F8EC', '✅': '#E8F8EC',
    '😮': '#FDEEE8', '🌟': '#FEF8E0', '🔄': '#EAF0FE',
  };
  const getEmoBg = (str) => {
    for (const [em, bg] of Object.entries(emotionPalette)) {
      if (str.startsWith(em)) return bg;
    }
    return '#F8F8F8';
  };

  return (
    <div>
      <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:36, fontWeight:700, marginBottom:6 }}>User Journey Maps 🗺️</h1>
      <p style={{ color:C.muted, marginBottom:32 }}>Trace each user's experience from first discovery through to settled living — and uncover where Matesy can make the biggest difference.</p>

      {/* Persona selector */}
      <div style={{ display:'flex', gap:14, marginBottom:32, flexWrap:'wrap' }}>
        {PERSONAS.map((per,i)=>(
          <button key={per.name} onClick={()=>setPIdx(i)} style={{
            padding:'14px 22px', borderRadius:18,
            border: pIdx===i ? 'none' : `2px solid ${C.border}`,
            background: pIdx===i ? per.color : 'white',
            color: pIdx===i ? 'white' : C.muted,
            fontFamily:'inherit', fontWeight:800, fontSize:14, cursor:'pointer',
            display:'flex', alignItems:'center', gap:10, transition:'all 0.2s',
            boxShadow: pIdx===i ? `0 6px 20px ${per.color}55` : 'none',
          }}>
            <span style={{ fontSize:22 }}>{per.emoji}</span>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize:15 }}>{per.name}</div>
              <div style={{ fontSize:11, fontWeight:600, opacity:0.85 }}>{per.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Persona intro */}
      <div style={{
        background:`linear-gradient(135deg, ${p.light}, white)`,
        borderRadius:20, padding:'20px 24px', border:`2px solid ${p.color}35`,
        marginBottom:28, display:'flex', gap:18, alignItems:'center',
      }}>
        <div style={{ width:60, height:60, background:p.color, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, flexShrink:0 }}>{p.emoji}</div>
        <div>
          <div style={{ fontWeight:800, fontSize:18, color:p.color }}>{p.name} &nbsp;·&nbsp; {p.label}</div>
          <div style={{ color:C.muted, fontSize:13, marginBottom:4 }}>Age {p.age} &nbsp;·&nbsp; {p.city}</div>
          <p style={{ color:C.text, fontSize:14, lineHeight:1.6 }}>{p.intro}</p>
        </div>
      </div>

      {/* Column headers */}
      <div style={{ display:'grid', gridTemplateColumns:'160px 2fr 130px 2fr 2fr', gap:0, marginBottom:4 }}>
        {['Stage','Actions','Emotion','⚠️ Pain point','💡 Opportunity'].map((h,i)=>(
          <div key={h} style={{ padding:'8px 16px', fontSize:11, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:0.8, background:C.bgAlt, borderRadius: i===0?'12px 0 0 12px':i===4?'0 12px 12px 0':'0', marginRight:1 }}>{h}</div>
        ))}
      </div>

      {/* Stages */}
      <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
        {p.stages.map((s,i)=>(
          <div key={s.stage} style={{ display:'grid', gridTemplateColumns:'160px 2fr 130px 2fr 2fr', border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden', background:'white', boxShadow:'0 1px 8px rgba(44,24,16,0.04)' }}>

            {/* Stage label */}
            <div style={{ background:p.light, padding:'16px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:`1px solid ${p.color}25` }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
              <div style={{ fontWeight:800, color:p.color, fontSize:13 }}>Stage {i+1}</div>
              <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{s.stage}</div>
            </div>

            {/* Actions */}
            <div style={{ padding:'16px 18px', borderRight:`1px solid ${C.border}`, display:'flex', alignItems:'center' }}>
              <p style={{ fontSize:13, lineHeight:1.65, color:C.text }}>{s.actions}</p>
            </div>

            {/* Emotion */}
            <div style={{ padding:'16px 12px', borderRight:`1px solid ${C.border}`, background:getEmoBg(s.emotion), display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.text, lineHeight:1.5 }}>{s.emotion}</div>
            </div>

            {/* Pain */}
            <div style={{ padding:'16px 18px', borderRight:`1px solid ${C.border}`, background:'#FFFAF8', display:'flex', alignItems:'center' }}>
              <p style={{ fontSize:13, lineHeight:1.65, color:C.text }}>{s.pain}</p>
            </div>

            {/* Opportunity */}
            <div style={{ padding:'16px 18px', background:'#FAFFF8', display:'flex', alignItems:'center' }}>
              <p style={{ fontSize:13, lineHeight:1.65, color:C.text }}>{s.opp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ background:'white', borderRadius:14, padding:'14px 20px', border:`1px solid ${C.border}`, marginTop:20, display:'flex', gap:24, flexWrap:'wrap', alignItems:'center' }}>
        <span style={{ fontWeight:800, fontSize:13 }}>Legend:</span>
        {[
          ['Stage','Entry point for each step', p.light],
          ['Actions','What the user does','white'],
          ['Emotion','Feeling at that moment','#FEF8E0'],
          ['⚠️ Pain','Friction or frustration','#FFFAF8'],
          ['💡 Opportunity','Where Matesy can shine','#FAFFF8'],
        ].map(([l,d,bg])=>(
          <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:14, height:14, borderRadius:4, background:bg, border:`1px solid ${C.border}` }}/>
            <span style={{ fontWeight:700, fontSize:12 }}>{l}</span>
            <span style={{ color:C.muted, fontSize:11 }}>— {d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]           = useState('home');
  const [onboardStep, setOStep]   = useState(0);
  const [quizStep, setQStep]      = useState(0);
  const [quizAnswers, setQAns]    = useState({});

  useEffect(()=>{
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  },[]);

  const NAV = [
    { id:'home',    label:'Home',       icon:'🏠' },
    { id:'search',  label:'Find Places',icon:'🔍' },
    { id:'match',   label:'Flatmates',  icon:'🤝' },
    { id:'quiz',    label:'My Quiz',    icon:'✨' },
    { id:'profile', label:'Profile',    icon:'👤' },
    { id:'journey', label:'Journey Map',icon:'🗺️' },
  ];

  const css = `
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    body { background:${C.bg}; font-family:'Nunito',sans-serif; }
    button { font-family:'Nunito',sans-serif; }
    input, textarea, select { font-family:'Nunito',sans-serif; }
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:${C.bg}; }
    ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
    @keyframes fadeSlide { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    .page-wrap { animation: fadeSlide 0.3s ease; }
  `;

  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:C.bg, minHeight:'100vh', color:C.text }}>
      <style>{css}</style>

      {/* TOP NAV */}
      <nav style={{ background:'white', borderBottom:`1px solid ${C.border}`, padding:'0 28px', display:'flex', alignItems:'center', height:64, position:'sticky', top:0, zIndex:200, boxShadow:'0 2px 16px rgba(44,24,16,0.06)', gap:4 }}>
        {/* Wordmark */}
        <div onClick={()=>setPage('home')} style={{ display:'flex', alignItems:'center', gap:10, marginRight:28, cursor:'pointer', flexShrink:0 }}>
          <div style={{ width:36, height:36, background:C.primary, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🏡</div>
          <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:20, fontWeight:700, color:C.text }}>Matesy</span>
        </div>

        {/* Nav items */}
        <div style={{ display:'flex', gap:2, flex:1, overflowX:'auto' }}>
          {NAV.map(n=>{
            const active = page===n.id;
            return (
              <button key={n.id} onClick={()=>setPage(n.id)} style={{
                padding:'7px 14px', borderRadius:12, border:'none', cursor:'pointer',
                background: active?C.primaryLight:'transparent',
                color: active?C.primary:C.muted,
                fontWeight:700, fontSize:13, display:'flex', alignItems:'center', gap:6,
                transition:'all 0.18s', whiteSpace:'nowrap',
              }}>
                <span>{n.icon}</span>{n.label}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button onClick={()=>setPage('onboard')} style={{ background:C.primary, color:'white', border:'none', padding:'9px 22px', borderRadius:100, fontFamily:'inherit', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0 }}>
          Get started →
        </button>
      </nav>

      {/* PAGE CONTENT */}
      <div className="page-wrap" key={page} style={{ maxWidth:1080, margin:'0 auto', padding:'44px 24px 80px' }}>
        {page==='home'    && <HomePage    setPage={setPage} />}
        {page==='onboard' && <OnboardPage setPage={setPage} step={onboardStep} setStep={setOStep} />}
        {page==='quiz'    && <QuizPage    step={quizStep} setStep={setQStep} answers={quizAnswers} setAnswers={setQAns} />}
        {page==='search'  && <SearchPage />}
        {page==='match'   && <MatchPage />}
        {page==='profile' && <ProfilePage answers={quizAnswers} />}
        {page==='journey' && <JourneyPage />}
      </div>
    </div>
  );
}