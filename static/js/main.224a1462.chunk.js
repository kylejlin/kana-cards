(this["webpackJsonpkana-cards"]=this["webpackJsonpkana-cards"]||[]).push([[0],Array(18).concat([function(e,t,n){e.exports=n.p+"static/media/settings.5f70f755.svg"},function(e,t,n){e.exports=n.p+"static/media/hiragana_stroke_order.e82e3b7c.png"},function(e,t,n){e.exports=n.p+"static/media/katakana_stroke_order.b38bd4cd.png"},function(e,t,n){e.exports=n(36)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),a=n(17),r=n.n(a),c=(n(26),n(11)),l=n(9),s=n(4),u=n(6),d=n(7),m=n(10),h=n(8),w=n(12);n(27);function v(e){var t=e.children;return i.a.createElement("div",{className:"Body"},t)}n(28);function f(e){var t=e.children,n=e.checked,o=e.onClick;return i.a.createElement("div",{className:"Checkbox"+(n?" Checkbox--checked":""),onClick:o},t)}n(29);function p(e){var t=e.children,n=e.background;return i.a.createElement("div",{className:"Header Header--"+n},t)}n(30);function g(e){var t=e.color,n=e.onClick;return i.a.createElement("button",{className:"HomeButton HomeButton--"+t,onClick:n},"x")}n(31);function S(e){var t=e.header,n=e.children;return i.a.createElement("div",{className:"Section"},i.a.createElement("div",{className:"Section__Header"},t),n)}var k,C,y,D=n(1);!function(e){e[e.DeckMenu=0]="DeckMenu",e[e.SettingsMenu=1]="SettingsMenu",e[e.CardMenu=2]="CardMenu",e[e.WritingDrill=3]="WritingDrill",e[e.PostDrillMenu=4]="PostDrillMenu"}(C||(C={})),function(e){e[e.v=0]="v",e[e.Kv=1]="Kv",e[e.Sv=2]="Sv",e[e.Tv=3]="Tv",e[e.Nv=4]="Nv",e[e.Hv=5]="Hv",e[e.Mv=6]="Mv",e[e.Yv=7]="Yv",e[e.Rv=8]="Rv",e[e.Wv=9]="Wv",e[e.N=10]="N"}(y||(y={}));var b,E=(k={},Object(D.a)(k,y.v,["a","i","u","e","o"]),Object(D.a)(k,y.Kv,["ka","ki","ku","ke","ko"]),Object(D.a)(k,y.Sv,["sa","shi","su","se","so"]),Object(D.a)(k,y.Tv,["ta","chi","tsu","te","to"]),Object(D.a)(k,y.Nv,["na","ni","nu","ne","no"]),Object(D.a)(k,y.Hv,["ha","hi","fu","he","ho"]),Object(D.a)(k,y.Mv,["ma","mi","mu","me","mo"]),Object(D.a)(k,y.Yv,["ya","yu","yo"]),Object(D.a)(k,y.Rv,["ra","ri","ru","re","ro"]),Object(D.a)(k,y.Wv,["wa","wi","we","wo"]),Object(D.a)(k,y.N,["n"]),k);function T(e){return b[e]}function R(e,t){var n=(""===t?[]:t.split(" ")).map((function(t){return e+"--"+t}));return e+[""].concat(Object(l.a)(n)).join(" ")}!function(e){e[e.Hiragana=0]="Hiragana",e[e.Katakana=1]="Katakana"}(b||(b={}));n(32);function M(e){var t=e.modifierName,n=void 0===t?"":t,o=e.onClick,a=e.children;return i.a.createElement("div",{className:R("Button",n),onClick:o},a)}var W=[[y.v,"Vowels"],[y.Kv,"k-"],[y.Sv,"s-"],[y.Tv,"t-"],[y.Nv,"n-"],[y.Hv,"h-"],[y.Mv,"m-"],[y.Yv,"y-"],[y.Rv,"r-"],[y.Wv,"w-"],[y.N,"n"]];function A(e){var t=e.deck,n=e.includedCategories,o=e.onToggleCategory,a=e.onHome,r=e.onDrillStart;return i.a.createElement(i.a.Fragment,null,i.a.createElement(p,{background:"blue"},T(t)),i.a.createElement(g,{color:"blue",onClick:a}),i.a.createElement(v,null,i.a.createElement(S,{header:"Categories"},W.map((function(e){var t=Object(s.a)(e,2),a=t[0],r=t[1];return i.a.createElement(f,{checked:n.has(a),onClick:function(){return o(a)},key:a},r)}))),i.a.createElement(M,{modifierName:"blue shadow",onClick:r},"Start")))}var j=n(18),P=n.n(j);n(33);function H(e){var t=e.onClick;return i.a.createElement("img",{src:P.a,alt:"Settings button",className:"SettingsButton",onClick:t})}function N(e){var t=e.decks,n=e.onSettings,o=e.onSelect;return i.a.createElement(i.a.Fragment,null,i.a.createElement(p,{background:"white"},"Lessons"),i.a.createElement(H,{onClick:n}),i.a.createElement(v,null,t.map((function(e){return i.a.createElement(M,{modifierName:"blue shadow",onClick:function(){return o(e)},key:e},T(e))}))))}var O=["Right","Left","Up","Down"];function L(e){var t=e.selectedSwipeDirection,n=e.areWritingCorrectionsEnabled,o=e.onHome,a=e.onSelectSwipeDirection,r=e.onToggleWritingCorrections;return i.a.createElement(i.a.Fragment,null,i.a.createElement(p,{background:"blue"},"Settings"),i.a.createElement(g,{color:"blue",onClick:o}),i.a.createElement(v,null,i.a.createElement(S,{header:"Correct Answer Swipe Direction"},O.map((function(e){return i.a.createElement(f,{checked:e===t,onClick:function(){return a(e)},key:e},e)}))),i.a.createElement(S,{header:"Writing Corrections"},i.a.createElement(f,{checked:n,onClick:r},"Enabled?"))))}n(34);function I(e){var t=e.selectedSwipeDirection,n=e.normalizedDelta;switch(t){case"Right":return n>0?i.a.createElement("div",{className:"AffirmationSwipeIndicator--horizontal--correct",style:{width:100*n+"vw"}}):i.a.createElement("div",{className:"AffirmationSwipeIndicator--horizontal--incorrect",style:{left:100*(1+n)+"vw",width:100*-n+"vw"}});case"Left":return n>0?i.a.createElement("div",{className:"AffirmationSwipeIndicator--horizontal--incorrect",style:{width:100*n+"vw"}}):i.a.createElement("div",{className:"AffirmationSwipeIndicator--horizontal--correct",style:{left:100*(1+n)+"vw",width:100*-n+"vw"}});case"Up":return n>0?i.a.createElement("div",{className:"AffirmationSwipeIndicator--vertical--incorrect",style:{height:89*n+"vh"}}):i.a.createElement("div",{className:"AffirmationSwipeIndicator--vertical--correct",style:{top:11+89*(1+n)+"vh",height:89*-n+"vh"}});case"Down":return n>0?i.a.createElement("div",{className:"AffirmationSwipeIndicator--vertical--correct",style:{height:89*n+"vh"}}):i.a.createElement("div",{className:"AffirmationSwipeIndicator--vertical--incorrect",style:{top:11+89*(1+n)+"vh",height:89*-n+"vh"}})}}n(35);var x=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props,t=e.deck,n=e.remainingCards,o=e.isTopCardRevealed,a=e.selectedSwipeDirection,r=e.normalizedDelta,c=e.areWritingCorrectionsEnabled,l=e.onHome,s=e.onReveal,u=e.onAffirmationSwipeStart,d=e.onAffirmationSwipeMove,m=e.onAffirmationSwipeEnd,h=e.canvasRef,w=this.props.onPenStart,v=this.props.onPenMove,f=this.props.onPenEnd;return o?i.a.createElement(i.a.Fragment,null,i.a.createElement(p,{background:"blue"},T(t)),i.a.createElement(g,{color:"blue",onClick:l}),i.a.createElement("canvas",{onTouchStart:c?w:u,onTouchMove:c?v:d,onTouchEnd:c?f:m,onMouseDown:c?w:z,onMouseMove:c?v:z,onMouseUp:c?f:z,width:window.innerWidth,height:.62*window.innerHeight,ref:h}),i.a.createElement("div",{className:"WritingDrill__CharacterContainer",onTouchStart:u,onTouchMove:d,onTouchEnd:m},i.a.createElement("div",{className:"WritingDrill__Characters"},i.a.createElement("img",{className:"WritingDrill__StrokeOrderImage",alt:n[0].romaji+" stroke order",src:n[0].image.src}))),i.a.createElement(I,{selectedSwipeDirection:a,normalizedDelta:r})):i.a.createElement(i.a.Fragment,null,i.a.createElement(p,{background:"blue"},T(t)),i.a.createElement(g,{color:"blue",onClick:l}),i.a.createElement("canvas",{onTouchStart:w,onTouchMove:v,onMouseDown:w,onMouseMove:v,onMouseUp:f,width:window.innerWidth,height:.62*window.innerHeight,ref:h}),i.a.createElement("div",{className:"WritingDrill__Romaji",onClick:s},n[0].romaji))}},{key:"componentDidMount",value:function(){this.props.canvasRef.current.addEventListener("touchmove",(function(e){e.preventDefault()}),{passive:!1})}}]),n}(i.a.Component);function z(){}var U,K=n(5),F=["a","i","u","e","o","ka","ki","ku","ke","ko","sa","shi","su","se","so","ta","chi","tsu","te","to","na","ni","nu","ne","no","ha","hi","fu","he","ho","ma","mi","mu","me","mo","ya","yu","yo","ra","ri","ru","re","ro","wa","wi","we","wo","n"],_=n(19),Y=n.n(_),X=n(20),B=n.n(X),q={leftCellX:58,topCellY:162,cellWidth:213.3,cellHeight:266.5,crop:{left:0,top:0,width:206,height:187},columns:11,rows:5,cellPositions:new Map([["n",{row:0,column:0}],["wa",{row:0,column:1}],["wi",{row:1,column:1}],["we",{row:3,column:1}],["wo",{row:4,column:1}],["ra",{row:0,column:2}],["ri",{row:1,column:2}],["ru",{row:2,column:2}],["re",{row:3,column:2}],["ro",{row:4,column:2}],["ya",{row:0,column:3}],["yu",{row:2,column:3}],["yo",{row:4,column:3}],["ma",{row:0,column:4}],["mi",{row:1,column:4}],["mu",{row:2,column:4}],["me",{row:3,column:4}],["mo",{row:4,column:4}],["ha",{row:0,column:5}],["hi",{row:1,column:5}],["fu",{row:2,column:5}],["he",{row:3,column:5}],["ho",{row:4,column:5}],["na",{row:0,column:6}],["ni",{row:1,column:6}],["nu",{row:2,column:6}],["ne",{row:3,column:6}],["no",{row:4,column:6}],["ta",{row:0,column:7}],["chi",{row:1,column:7}],["tsu",{row:2,column:7}],["te",{row:3,column:7}],["to",{row:4,column:7}],["sa",{row:0,column:8}],["shi",{row:1,column:8}],["su",{row:2,column:8}],["se",{row:3,column:8}],["so",{row:4,column:8}],["ka",{row:0,column:9}],["ki",{row:1,column:9}],["ku",{row:2,column:9}],["ke",{row:3,column:9}],["ko",{row:4,column:9}],["a",{row:0,column:10}],["i",{row:1,column:10}],["u",{row:2,column:10}],["e",{row:3,column:10}],["o",{row:4,column:10}]])},J={leftCellX:58,topCellY:162,cellWidth:213.3,cellHeight:266.5,crop:{left:0,top:0,width:206,height:187},columns:11,rows:5,cellPositions:new Map([["n",{row:0,column:0}],["wa",{row:0,column:1}],["wi",{row:1,column:1}],["we",{row:3,column:1}],["wo",{row:4,column:1}],["ra",{row:0,column:2}],["ri",{row:1,column:2}],["ru",{row:2,column:2}],["re",{row:3,column:2}],["ro",{row:4,column:2}],["ya",{row:0,column:3}],["yu",{row:2,column:3}],["yo",{row:4,column:3}],["ma",{row:0,column:4}],["mi",{row:1,column:4}],["mu",{row:2,column:4}],["me",{row:3,column:4}],["mo",{row:4,column:4}],["ha",{row:0,column:5}],["hi",{row:1,column:5}],["fu",{row:2,column:5}],["he",{row:3,column:5}],["ho",{row:4,column:5}],["na",{row:0,column:6}],["ni",{row:1,column:6}],["nu",{row:2,column:6}],["ne",{row:3,column:6}],["no",{row:4,column:6}],["ta",{row:0,column:7}],["chi",{row:1,column:7}],["tsu",{row:2,column:7}],["te",{row:3,column:7}],["to",{row:4,column:7}],["sa",{row:0,column:8}],["shi",{row:1,column:8}],["su",{row:2,column:8}],["se",{row:3,column:8}],["so",{row:4,column:8}],["ka",{row:0,column:9}],["ki",{row:1,column:9}],["ku",{row:2,column:9}],["ke",{row:3,column:9}],["ko",{row:4,column:9}],["a",{row:0,column:10}],["i",{row:1,column:10}],["u",{row:2,column:10}],["e",{row:3,column:10}],["o",{row:4,column:10}]])},V=(U={},Object(D.a)(U,b.Hiragana,K.option.none()),Object(D.a)(U,b.Katakana,K.option.none()),U),$=Q(Y.a,q),G=Q(B.a,J);$.raw.then((function(e){V[b.Hiragana]=K.option.some(e)})),G.raw.then((function(e){V[b.Katakana]=K.option.some(e)}));Promise.all([$.raw,G.raw]);function Q(e,t){var n=function(){var e,t;return{raw:new Promise((function(n,o){e=n,t=o})),fulfill:e,reject:t}}(),o=document.createElement("img");return o.src=e,o.addEventListener("load",(function(){var e=document.createElement("canvas");e.width=o.width,e.height=o.height;var i=e.getContext("2d");i.drawImage(o,0,0);var a=new Map,r=document.createElement("canvas");r.width=t.crop.width,r.height=t.crop.height;var c=r.getContext("2d");F.forEach((function(e){var n=t.cellPositions.get(e),o=n.column,l=n.row,s=Math.round(t.leftCellX+o*t.cellWidth),u=Math.round(t.topCellY+l*t.cellHeight),d=i.getImageData(s+t.crop.left,u+t.crop.top,t.crop.width,t.crop.height);c.putImageData(d,0,0);var m=document.createElement("img");m.src=r.toDataURL("image/png",1),a.set(e,m)})),n.fulfill(a)})),o.addEventListener("error",n.reject),n}function Z(e){for(var t=e.slice(),n=0;n<256;n++)t.sort(ee);return t}function ee(){return Math.random()-.5}function te(e){var t=e.deck,n=e.onRestart,o=e.onHome;return i.a.createElement(i.a.Fragment,null,i.a.createElement(p,{background:"white"},T(t)),i.a.createElement(M,{modifierName:"blue shadow",onClick:n},"Restart"),i.a.createElement(M,{modifierName:"blue shadow",onClick:o},"Home"))}var ne=.3*window.innerWidth,oe=.2*window.innerHeight,ie="ontouchstart"in window,ae="selectedSwipeDirection",re="areWritingCorrectionsEnabled",ce="includedCategories",le=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(e){var o;return Object(u.a)(this,n),(o=t.call(this,e)).canvasRef=void 0,o.previousPenLocation=void 0,o.state={stateType:C.DeckMenu},o.bindMethods(),o.canvasRef=i.a.createRef(),o.previousPenLocation=null,o}return Object(d.a)(n,[{key:"bindMethods",value:function(){this.onSettings=this.onSettings.bind(this),this.onSelectSwipeDirection=this.onSelectSwipeDirection.bind(this),this.onToggleWritingCorrections=this.onToggleWritingCorrections.bind(this),this.onDeckSelect=this.onDeckSelect.bind(this),this.onToggleCategory=this.onToggleCategory.bind(this),this.onDrillStart=this.onDrillStart.bind(this),this.onCardReveal=this.onCardReveal.bind(this),this.onAffirmationSwipeStart=this.onAffirmationSwipeStart.bind(this),this.onAffirmationSwipeMove=this.onAffirmationSwipeMove.bind(this),this.onAffirmationSwipeEnd=this.onAffirmationSwipeEnd.bind(this),this.onKeyUp=this.onKeyUp.bind(this),this.onCardCorrect=this.onCardCorrect.bind(this),this.onCardIncorrect=this.onCardIncorrect.bind(this),this.onDrillRestart=this.onDrillRestart.bind(this),this.onHome=this.onHome.bind(this),this.onPenStart=this.onPenStart.bind(this),this.onPenMove=this.onPenMove.bind(this),this.onPenEnd=this.onPenEnd.bind(this)}},{key:"componentDidMount",value:function(){ie||window.addEventListener("keyup",this.onKeyUp)}},{key:"componentWillUnmount",value:function(){ie||window.removeEventListener("keyup",this.onKeyUp)}},{key:"render",value:function(){var e=this.state;switch(e.stateType){case C.DeckMenu:return i.a.createElement(N,{decks:[b.Hiragana,b.Katakana],onSettings:this.onSettings,onSelect:this.onDeckSelect});case C.SettingsMenu:return i.a.createElement(L,{selectedSwipeDirection:e.selectedSwipeDirection,areWritingCorrectionsEnabled:e.areWritingCorrectionsEnabled,onHome:this.onHome,onSelectSwipeDirection:this.onSelectSwipeDirection,onToggleWritingCorrections:this.onToggleWritingCorrections});case C.CardMenu:var t=e.deck,n=e.includedCategories;return i.a.createElement(A,{deck:t,includedCategories:n,onToggleCategory:this.onToggleCategory,onHome:this.onHome,onDrillStart:this.onDrillStart});case C.WritingDrill:var o=e.deck,a=e.remainingCards,r=e.isTopCardRevealed,c=e.selectedSwipeDirection,l=e.normalizedDelta,s=e.areWritingCorrectionsEnabled;return i.a.createElement(x,{deck:o,remainingCards:a,isTopCardRevealed:r,selectedSwipeDirection:c,normalizedDelta:l,areWritingCorrectionsEnabled:s,onHome:this.onHome,onPenStart:this.onPenStart,onPenMove:this.onPenMove,onPenEnd:this.onPenEnd,onReveal:this.onCardReveal,onAffirmationSwipeStart:this.onAffirmationSwipeStart,onAffirmationSwipeMove:this.onAffirmationSwipeMove,onAffirmationSwipeEnd:this.onAffirmationSwipeEnd,canvasRef:this.canvasRef});case C.PostDrillMenu:var u=e.deck;return i.a.createElement(te,{deck:u,onHome:this.onHome,onRestart:this.onDrillRestart})}}},{key:"onSettings",value:function(){var e={stateType:C.SettingsMenu,selectedSwipeDirection:localStorage.getItem(ae)||"Right",areWritingCorrectionsEnabled:"true"===localStorage.getItem(re)};this.setState(e)}},{key:"onSelectSwipeDirection",value:function(e){this.updateState(C.SettingsMenu,{selectedSwipeDirection:e}),localStorage.selectedSwipeDirection=e}},{key:"updateState",value:function(e,t){this.setState(t)}},{key:"onToggleWritingCorrections",value:function(){var e=this.state,t=!e.areWritingCorrectionsEnabled,n={areWritingCorrectionsEnabled:t};this.updateState(e.stateType,n),localStorage.areWritingCorrectionsEnabled=t}},{key:"onDeckSelect",value:function(e){var t=localStorage.getItem(ce),n={stateType:C.CardMenu,deck:e,includedCategories:null===t?Object(w.a)():se.parse(t)};this.setState(n)}},{key:"onToggleCategory",value:function(e){var t=this.state,n=t.includedCategories,o=n.has(e)?n.remove(e):n.add(e);this.updateState(t.stateType,{includedCategories:o}),localStorage.setItem(ce,se.stringify(o))}},{key:"onDrillStart",value:function(){var e=this.state,t=Z(function(e,t){var n,o=[],i=Object(c.a)(e);try{for(i.s();!(n=i.n()).done;){var a,r=n.value,l=Object(c.a)(E[r]);try{for(l.s();!(a=l.n()).done;){var s=a.value;o.push({romaji:s,image:V[t].expect("Kana image map has not loaded yet").get(s)})}}catch(u){l.e(u)}finally{l.f()}}}catch(u){i.e(u)}finally{i.f()}return o}(e.includedCategories,e.deck)),n={stateType:C.WritingDrill,deck:e.deck,initialCards:t,remainingCards:t,cardsToRepractice:[],isTopCardRevealed:!1,areWritingCorrectionsEnabled:"true"===localStorage.getItem(re),selectedSwipeDirection:localStorage.getItem(ae)||"Right",startingTouch:void 0,normalizedDelta:0};this.setState(n)}},{key:"onAffirmationSwipeStart",value:function(e){var t=e.changedTouches,n=this.state;if(n.isTopCardRevealed){var o={startingTouch:["Right","Left"].includes(n.selectedSwipeDirection)?{id:t[0].identifier,x:t[0].clientX}:{id:t[0].identifier,y:t[0].clientY},normalizedDelta:0};this.updateState(n.stateType,o)}}},{key:"onAffirmationSwipeMove",value:function(e){var t=this.state;e.preventDefault();var n=e.changedTouches,o=t.startingTouch.id,i=Array.from(n).find((function(e){return e.identifier===o}));if(i)if(["Right","Left"].includes(t.selectedSwipeDirection)){var a=i.clientX-t.startingTouch.x,r={normalizedDelta:Math.max(-1,Math.min(1,a/ne))};this.updateState(t.stateType,r)}else{var c=i.clientY-t.startingTouch.y,l={normalizedDelta:Math.max(-1,Math.min(1,c/oe))};this.updateState(t.stateType,l)}}},{key:"onAffirmationSwipeEnd",value:function(){var e=this.state,t=e.selectedSwipeDirection,n=e.normalizedDelta,o={startingTouch:void 0,normalizedDelta:0};this.updateState(e.stateType,o),"Right"===t&&-1===n||"Left"===t&&1===n||"Up"===t&&1===n||"Down"===t&&-1===n?this.onCardIncorrect():("Right"===t&&1===n||"Left"===t&&-1===n||"Up"===t&&-1===n||"Down"===t&&1===n)&&this.onCardCorrect()}},{key:"onKeyUp",value:function(e){var t=e.key,n=this.state;n.stateType===C.WritingDrill&&(n.isTopCardRevealed&&(["Right","Left"].includes(n.selectedSwipeDirection)?"ArrowRight"===t||"Right"===t?this.simulateRightSwipe():"ArrowLeft"!==t&&"Left"!==t||this.simulateLeftSwipe():"ArrowUp"===t||"Up"===t?this.simulateUpSwipe():"ArrowDown"!==t&&"Down"!==t||this.simulateDownSwipe()))}},{key:"onCardReveal",value:function(){this.updateState(C.WritingDrill,{isTopCardRevealed:!0,normalizedDelta:0})}},{key:"onCardCorrect",value:function(){this.clearCanvas();var e=this.state;if(e.remainingCards.length>1)this.updateState(e.stateType,{remainingCards:e.remainingCards.slice(1),isTopCardRevealed:!1});else if(e.cardsToRepractice.length>0)this.updateState(e.stateType,{remainingCards:Z(e.cardsToRepractice),cardsToRepractice:[],isTopCardRevealed:!1});else{var t={stateType:C.PostDrillMenu,deck:e.deck,initialCards:e.initialCards};this.setState(t)}}},{key:"clearCanvas",value:function(){var e=this.canvasRef.current,t=e.width,n=e.height;this.canvasRef.current.getContext("2d").clearRect(0,0,t,n)}},{key:"onCardIncorrect",value:function(){this.clearCanvas();var e=this.state;e.remainingCards.length>1?this.updateState(e.stateType,{remainingCards:e.remainingCards.slice(1),cardsToRepractice:e.cardsToRepractice.concat([e.remainingCards[0]]),isTopCardRevealed:!1}):this.updateState(e.stateType,{remainingCards:Z(e.cardsToRepractice.concat([e.remainingCards[0]])),cardsToRepractice:[],isTopCardRevealed:!1})}},{key:"onDrillRestart",value:function(){var e=this.state;this.setState({stateType:C.WritingDrill,deck:e.deck,remainingCards:Z(e.initialCards),isTopCardRevealed:!1,normalizedDelta:0,cardsToRepractice:[]})}},{key:"onHome",value:function(){this.setState({stateType:C.DeckMenu})}},{key:"onPenStart",value:function(e){var t=this.state,n="touchstart"===e.type?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[e.clientX,e.clientY],o=Object(s.a)(n,2),i=o[0],a=o[1],r=.11*window.innerHeight,c=a-r;this.previousPenLocation={x:i,y:c};var l=this.canvasRef.current.getContext("2d");l.fillStyle=t.isTopCardRevealed?"#0088FF":"#000088",l.fillRect(i,a-r,2,2)}},{key:"onPenMove",value:function(e){e.preventDefault();var t=this.state;if(null!==this.previousPenLocation){var n="touchmove"===e.type?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[e.clientX,e.clientY],o=Object(s.a)(n,2),i=o[0],a=o[1],r=.11*window.innerHeight,c=a-r,l=this.canvasRef.current.getContext("2d");l.fillRect(i,a-r,1,1),l.beginPath(),l.moveTo(this.previousPenLocation.x,this.previousPenLocation.y),l.lineTo(i,c),l.closePath(),l.lineWidth=2,l.strokeStyle=t.isTopCardRevealed?"#0088FF":"#000088",l.stroke(),this.previousPenLocation={x:i,y:c}}}},{key:"onPenEnd",value:function(){this.previousPenLocation=null}},{key:"simulateRightSwipe",value:function(){var e=this,t=this.state,n=Date.now();!function o(){var i=(Date.now()-n)/150;i<1.2?requestAnimationFrame(o):"Right"===t.selectedSwipeDirection?e.onCardCorrect():e.onCardIncorrect(),e.updateState(t.stateType,{normalizedDelta:Math.min(1,i)})}()}},{key:"simulateLeftSwipe",value:function(){var e=this,t=this.state,n=Date.now();!function o(){var i=(Date.now()-n)/150;i<1.2?requestAnimationFrame(o):"Left"===t.selectedSwipeDirection?e.onCardCorrect():e.onCardIncorrect(),e.updateState(t.stateType,{normalizedDelta:Math.max(-1,-i)})}()}},{key:"simulateUpSwipe",value:function(){var e=this,t=this.state,n=Date.now();!function o(){var i=(Date.now()-n)/150;i<1.2?requestAnimationFrame(o):"Up"===t.selectedSwipeDirection?e.onCardCorrect():e.onCardIncorrect(),e.updateState(t.stateType,{normalizedDelta:Math.max(-1,-i)})}()}},{key:"simulateDownSwipe",value:function(){var e=this,t=this.state,n=Date.now();!function o(){var i=(Date.now()-n)/150;i<1.2?requestAnimationFrame(o):"Down"===t.selectedSwipeDirection?e.onCardCorrect():e.onCardIncorrect(),e.updateState(t.stateType,{normalizedDelta:Math.min(1,i)})}()}}]),n}(i.a.Component),se={stringify:function(e){return JSON.stringify(Object(l.a)(e.keys()))},parse:function(e){return Object(w.a)(JSON.parse(e))}};var ue=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function de(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(le,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/kana-cards",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/kana-cards","/service-worker.js");ue?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):de(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):de(t,e)}))}}()}]),[[21,1,2]]]);
//# sourceMappingURL=main.224a1462.chunk.js.map