// Restore an explicit preference; otherwise follow the browser language.
let language=/^zh(?:-|$)/i.test(navigator.languages?.[0]||navigator.language||'en')?'zh':'en';
try{const savedLanguage=localStorage.getItem('bj-lab-language-v1');if(savedLanguage==='zh'||savedLanguage==='en')language=savedLanguage}catch{}
const english={
'21点练习室':'Blackjack Lab','练习每一次选择':'Make every decision count',
'下一手，打得更好。':'Play your next hand better.',
'看懂牌局背后的理由，把基础策略练成直觉。':'Understand the why behind each play. Turn basic strategy into instinct.',
'学习模式':'Learn','边玩边学':'Play with guidance','训练模式':'Train','检验直觉':'Test your instincts',
'庄家':'Dealer','策略教练':'Strategy coach','训练反馈':'Training feedback','训练记录':'Training record',
'重置':'Reset','正确率':'Accuracy','已答决策':'Decisions','连续答对':'Streak','练习错题':'Review mistakes',
'第一次玩？查看规则与操作':'New to blackjack? Rules and controls',
'目标：点数比庄家大且不超过 21。2–10 按牌面计分，J/Q/K 算 10；A 算 1 或 11。含一个算 11 的 A 是「软牌」，否则是「硬牌」。':'Goal: beat the dealer without going over 21. Cards 2–10 count at face value; J/Q/K count as 10. An ace counts as 1 or 11. A hand with an ace counted as 11 is “soft”; otherwise it is “hard”.',
'要牌':'Hit','停牌':'Stand','加倍':'Double','分牌':'Split',
'：再拿一张。':' : take another card. ','：结束这手。':' : finish your hand. ',
'：模拟注额翻倍，只补一张。':' : double your simulated stake and take exactly one card. ',
'：相同点值的两张牌拆成两手，各补一张。':' : separate two cards of equal value into two hands, each receiving a new card.',
'本练习：每局重洗 6 副牌；庄家软 17 停牌；美式底牌并先查 Blackjack；任意首两张可加倍，分牌后可加倍；最多 4 手；分 A 后只补一张且不再分。无投降、保险。首两张 A+10 为 Blackjack，分牌后的 21 按普通 21 计算。':'Rules: six decks, shuffled each round. Dealer stands on soft 17; US hole card with a blackjack peek. Double on any first two cards, including after splitting. Maximum four hands. Split aces receive one card each and cannot be split again. No surrender or insurance. An initial ace plus a ten-value card is blackjack; 21 after a split is a regular 21.',
'学习模式完整模拟牌局；训练模式每题只评估一次决策，不以输赢评判策略。训练记录仅保存在当前浏览器。基础策略追求长期更好的期望结果，不能保证单局获胜。':'Learn mode simulates complete rounds. Train mode evaluates one decision per question, regardless of winning or losing. Training records are stored only in this browser. Basic strategy improves long-term expected results; it does not guarantee a win on any hand.',
'策略参考：':'Strategy reference: ','Wizard of Odds · 4–8 副牌基础策略':'Wizard of Odds · 4–8 deck basic strategy','（S17，无投降）。':' (S17, no surrender).',
'只练决策，不涉及真钱。':'Practice decisions. No real money.','一步一步，建立你的牌感。':'Build your instincts, one hand at a time.',
'学习 · 完整牌局':'Learn · Complete round','训练 · 错题复习':'Train · Mistake review','训练 · 单步决策':'Train · One decision',
'先做选择，再看解析。':'Make your choice, then see the explanation.','选择一个动作，开始练习。':'Choose an action to practice.',
'下一题 →':'Next question →','下一局 →':'Next round →','一局结束':'Round complete',
'这一手，你会怎么打？':'What would you play?',
'赢一局不一定是好决策，输一局也不一定做错。重点是每一步是否符合策略。':'A win does not prove a good decision, and a loss does not prove a mistake. Focus on following basic strategy at each step.',
'观察自己的点数、是否有 A 或对子，再结合庄家的明牌做选择。答案会在你作答后显示。':'Check your total, aces and pairs, then consider the dealer’s upcard. The answer appears after you choose.',
'拆开两个 A，让每手都有机会组成强牌。':'Split aces to give each hand a chance to become a strong total.',
'硬 16 很难打好；拆成两个 8，长期结果更有利。':'Hard 16 is a difficult hand. Splitting into two eights gives a better long-term result.',
'软牌的 A 可从 11 改算 1，补牌较灵活；庄家明牌较弱，适合加倍。':'The ace can change from 11 to 1, making this a flexible hand. Against a weak dealer upcard, doubling improves expected results.',
'硬 12 对庄家 2 或 3 仍应要牌；庄家的爆牌机会不足以支持停牌。':'Hit hard 12 against a dealer 2 or 3. The dealer’s chance of busting is not high enough to justify standing.',
'✓ 正确！这就是基础策略的选择。':'✓ Correct! That is the basic strategy play.',
'✓ 符合基础策略。':'✓ Matches basic strategy.',
'清空正确率和错题记录？':'Clear your accuracy and mistake records?'
};
const patterns=[
[/^对子 (\d+) 对庄家 (\w+)，分成两手能改善长期期望。$/,(_,p,u)=>`Splitting a pair of ${p}s against a dealer ${u} improves long-term expected results.`],
[/^软 (\d+) 已有竞争力，在这个对局继续补牌不划算。$/,(_,t)=>`Soft ${t} is competitive here. Taking another card does not improve your expected result.`],
[/^软 (\d+) 仍需改善；A 可改算 1，给你补牌的余地。$/,(_,t)=>`Soft ${t} needs improvement. The ace can count as 1, giving you room to hit.`],
[/^硬 (\d+) 的补牌潜力较好，面对庄家 (\w+)，加倍能提高长期期望。$/,(_,t,u)=>`Hard ${t} has good drawing potential. Doubling against a dealer ${u} improves long-term expected results.`],
[/^硬 (\d+) 已足够强，继续要牌的爆牌风险太高。$/,(_,t)=>`Hard ${t} is strong enough. The risk of busting by hitting is too high.`],
[/^庄家 (\d+) 是弱明牌。保留硬 (\d+)，让庄家承担补牌风险。$/,(_,u,t)=>`The dealer’s ${u} is a weak upcard. Stand on hard ${t} and let the dealer take the drawing risk.`],
[/^硬 (\d+) 再补一张不会爆牌，应该继续改善点数。$/,(_,t)=>`You cannot bust by hitting hard ${t}. Take another card to improve your total.`],
[/^面对庄家 (\w+)，硬 (\d+) 停牌的长期结果更差；即使可能爆牌，仍应要牌。$/,(_,u,t)=>`Standing on hard ${t} against a dealer ${u} has a worse long-term result. Hit, even though you may bust.`],
[/^本局模拟结果：([+\-.\d]+) 单位。好决策看长期，别被一局输赢左右。$/,(_,n)=>`Simulated result: ${n} units. Judge decisions over the long run, not by one round.`],
[/^再记一次：你选择了(.+)，推荐(.+)。$/,(_,a,b)=>`Remember: you chose ${translate(a)}; basic strategy recommends ${translate(b)}.`],
[/^这一步更推荐(.+)：(.+)$/,(_,a,b)=>`Recommended: ${translate(a)}. ${translate(b)}`],
[/^建议(.+)$/,(_,a)=>`Recommended: ${translate(a)}`],
[/^明牌 (.+)$/,(_,r)=>`Upcard ${r}`],
[/^(\d+) 点$/,(_,n)=>`${n} points`],
[/^(软|硬) (\d+) 对庄家 (.+) · (.+)$/,(_,s,n,u,d)=>`${s==='软'?'Soft':'Hard'} ${n} vs dealer ${u} · ${d==='首两张可加倍'?'Double available on first two cards':'No double after hitting'}`]
];
function translate(text){if(language==='zh')return text;const s=text.trim();if(Object.hasOwn(english,s))return text.replace(s,english[s]);for(const [re,fn] of patterns)if(re.test(s))return text.replace(s,s.replace(re,fn));return text.replace(/你的手牌/g,'Your hand').replace(/(\d+) 点/g,'$1 points').replace(/软牌/g,'Soft').replace(/硬牌/g,'Hard').replace(/已加倍/g,'Doubled').replace(/爆牌/g,'Bust').replace(/获胜/g,'Win').replace(/落败/g,'Loss').replace(/平局/g,'Push')}
// Keep original static nodes so switching back does not depend on reverse translation.
const staticText=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walker.nextNode()){const node=walker.currentNode;if(!['SCRIPT','STYLE'].includes(node.parentElement.tagName)&&node.textContent.trim())staticText.push([node,node.textContent])}
function applyLanguage(){for(const [node,text] of staticText)if(node.isConnected)node.textContent=text;document.documentElement.lang=language==='zh'?'zh-CN':'en';document.title=language==='zh'?'21点练习室 · Blackjack':'Blackjack Lab · Learn & Train';document.querySelector('nav').setAttribute('aria-label',language==='zh'?'游戏模式':'Game mode');for(const l of ['zh','en'])document.getElementById('lang-'+l).setAttribute('aria-pressed',String(l===language));const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(w.nextNode()){const n=w.currentNode;if(!['SCRIPT','STYLE'].includes(n.parentElement.tagName))n.textContent=translate(n.textContent)}document.querySelectorAll('.card.back').forEach(n=>n.setAttribute('aria-label',language==='zh'?'暗牌':'Hidden card'))}
for(const l of ['zh','en'])document.getElementById('lang-'+l).onclick=()=>{language=l;try{localStorage.setItem('bj-lab-language-v1',l)}catch{}render()};
