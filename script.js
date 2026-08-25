const ingredientData=[
{name:"Cocoa Butter",cost:2.5,clue:"I am a solid botanical butter.",correct:"Structural role"},
{name:"Sweet Almond Oil",cost:3,clue:"I provide a lightweight botanical feel.",correct:"Carrier oil"},
{name:"Hibiscus Oil",cost:3.5,clue:"A premium botanical ingredient.",correct:"Botanical oil"},
{name:"Tamarind Seed Extract",cost:1.5,clue:"I come from discarded material.",correct:"Upcycled ingredient"},
{name:"Vitamin E",cost:2,clue:"I support oil-based formulations.",correct:"Antioxidant"},
{name:"Rose Geranium",cost:4,clue:"I contribute to sensory experience.",correct:"Essential oil"}
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
<h3>${item.name}</h3>
<p>Click to discover</p>
</div>

<div class="back">
<p>${item.clue}</p>
<button onclick="chooseIngredient('${item.name}',${item.cost},event)">Use</button>
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

document.getElementById("clientResult").innerHTML=`Aura says: Great choice for a <strong>${name}</strong> client.`;

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
selected.map(i=>i.name).join(" • ");

document.getElementById("budgetText").innerHTML=`RM${total.toFixed(1)} / RM20`;

let percent=(total/budget)*100;

document.getElementById("fill").style.width=percent+"%";

if(percent>100)
document.getElementById("fill").style.background="red";

}

function activateFormula(){

let total=selected.reduce((a,b)=>a+b.cost,0);

let title="";
let text="";

if(selected.find(i=>i.name==="Tamarind Seed Extract")){

title="🌿 Green Innovator";
text="You balanced sustainability and botanical choices beautifully.";

}else if(client==="Luxury botanical"){

title="✨ Botanical Formulator";
text="You created a premium botanical concept.";

}else{

title="💗 Client-Centred Formulator";
text="You matched your formulation to client needs.";

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
`Aura Study Buddy: Excellent. Your next iteration focuses on <strong>${choice}</strong>. Great formulators always improve through reflection.`;

}
