const debug1 = document.getElementById("debug-1");
const debug2 = document.getElementById("debug-2");
const debug3 = document.getElementById("debug-3");
const debug4 = document.getElementById("debug-4");
const debug5 = document.getElementById("debug-5");
const debug6 = document.getElementById("debug-6");

const run = document.getElementById("run");

async function loadData(){
    const response = await fetch("request_attention_intervention.json");
    const data = await response.json(); 
    console.log(data);
}

debug1.addEventListener("click", async function(){
    const response = await fetch("request_attention_intervention.json");
    const data = await response.json();
    document.getElementById("model-1-text").textContent = data.prompt;
    document.getElementById("model-2-text").textContent = data.prompt;
})

debug2.addEventListener("click", async function(){
    const response = await fetch("request_mlp_intervention.json");
    const data = await response.json();
    document.getElementById("model-1-text").textContent = data.prompt;
    document.getElementById("model-2-text").textContent = data.prompt;
})

debug3.addEventListener("click", async function(){
    const response = await fetch("request_no_intervention.json");
    const data = await response.json();
    document.getElementById("model-1-text").textContent = data.prompt;
    document.getElementById("model-2-text").textContent = data.prompt;
})

debug4.addEventListener("click", async function(){
    const response = await fetch("successful_response_sample.json");
    const data = await response.json();
    document.getElementById("model-1-text").textContent = data.condition_a_text;
    document.getElementById("model-2-text").textContent = data.condition_b_text;
})

debug5.addEventListener("click", async function(){
    const response = await fetch("validation_error_generic.json");
    const data = await response.json();
    document.getElementById("model-1-text").textContent = "ERROR RESPONSE (Validation Error)";
    document.getElementById("model-2-text").textContent = "ERROR RESPONSE (Validation Error)";
})

debug6.addEventListener("click", async function(){
    const response = await fetch("validation_error_top_p_sample.json");
    const data = await response.json();
    document.getElementById("model-1-text").textContent = "ERROR RESPONSE (Not enough words)";
    document.getElementById("model-2-text").textContent = "ERROR RESPONSE (Not enough words)";
})

run.addEventListener("click", function(){
    document.getElementById("model-1-text").textContent = document.getElementById("input").value;
    document.getElementById("model-2-text").textContent = document.getElementById("input").value;
})







loadData();