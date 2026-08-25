const ingredientData = [
{
name:"Sweet Almond Oil",
cost:3,
clue:"A lightweight botanical oil loved for nail care.",
correct:"Carrier oil"
},
{
name:"Hibiscus Oil",
cost:3.5,
clue:"A botanical ingredient for a premium care experience.",
correct:"Botanical oil"
},
{
name:"Gromwell Root",
cost:2.5,
clue:"A botanical ingredient traditionally associated with natural colour and plant-based beauty.",
correct:"Botanical extract"
},
{
name:"Tamarind Seed Extract",
cost:1.5,
clue:"I give discarded material a second life.",
correct:"Upcycled ingredient"
},
{
name:"Vitamin E",
cost:2,
clue:"I help support oil-based formulations.",
correct:"Antioxidant"
},
{
name:"Rose Geranium",
cost:4,
clue:"I contribute to the sensory experience.",
correct:"Essential oil"
},
{
name:"Vanilla",
cost:3,
clue:"I create a warm comforting aroma.",
correct:"Fragrance note"
}
];

let selected=[];
let budget=20;
let client="";

const container=document.getElementById("ingredients");

ingredientData.forEach(item=>{

const card=document.createElement("div");
card.className="ingredient";

card.innerHTML=`
<div class="inner">

<div class="front">
<div class="icon">🌿</div>
<h3>${item.name}</h3>
<p>Tap to Discover</p>
</div>

<div class="back">
<p>${item.clue}</p>
<button onclick="chooseIngredient('${item.name}',${item.cost},event)">Add to Formula</button>
</div>

</div>
`;

card.addEventListener("click",()=>card.classList.toggle("flipped"));

container.appendChild(card);

});

function startMission(){

document.getElementById("landing").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");

}

function selectClient(el,name){

document.querySelectorAll(".client").forEach(c=>c.classList.remove("selected"));

el.classList.add("selected");

client=name;

document.getElementById("clientResult").innerHTML=
`🤖 Aura: Excellent choice. Let's formulate for a <strong>${name}</strong> client.`;

}

function chooseIngredient(name,cost,event){

event.stopPropagation();

if(selected.find(i=>i.name===name)) return;

selected.push({name,cost});

updateCore();

if(name==="Tamarind Seed Extract")
document.getElementById("sustainabilityCard").classList.remove("hidden");

}

function updateCore(){

const total=selected.reduce((a,b)=>a+b.cost,0);

document.getElementById("selectedList").innerHTML=
selected.map(i=>`🌿 ${i.name}`).join("<br>");

document.getElementById("budgetText").innerHTML=`RM${total.toFixed(1)} / RM20`;

const percent=Math.min((total/budget)*100,100);

document.getElementById("fill").style.width=percent+"%";

if(total>budget){
document.getElementById("fill").style.background="#D63A3A";
}

}

function activateFormula(){

let title="";
let text="";

const hasUpcycled=selected.find(i=>i.name==="Tamarind Seed Extract");
const hasLuxury=selected.find(i=>i.name==="Rose Geranium");
const hasBotanical=selected.find(i=>i.name==="Gromwell Root");

if(hasUpcycled){

title="♻️ Green Innovator";

text="You prioritised sustainability while developing a botanical formulation.";

}
else if(hasLuxury){

title="✨ Botanical Formulator";

text="You created a premium botanical sensory experience.";

}
else if(hasBotanical){

title="🌿 Creative Formulator";

text="Your botanical thinking helped shape a unique formulation.";

}
else{

title="💗 Client-Centred Formulator";

text="You focused on creating a formulation that suits your client's needs.";

}

document.getElementById("identityTitle").innerHTML=title;
document.getElementById("identityText").innerHTML=text;

document.getElementById("resultCard").classList.remove("hidden");
document.getElementById("reflection").classList.remove("hidden");

window.scrollTo({
top:document.body.scrollHeight,
behavior:"smooth"
});

}

function reflect(choice){

document.getElementById("reflectionText").innerHTML=
`🤖 Aura Study Buddy: Great decision. Your second iteration now focuses on <strong>${choice}</strong>. Every formulation improves through reflection.`;

}
