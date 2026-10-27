// DEBUG BUTTON
const debug1 = document.getElementById("debug-1");
const debug2 = document.getElementById("debug-2");
const debug3 = document.getElementById("debug-3");
const debug4 = document.getElementById("debug-4");
const debug5 = document.getElementById("debug-5");
const debug6 = document.getElementById("debug-6");

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

// MODEL OPTION
const singleModel = document.getElementById("single-model");
const doubleModel = document.getElementById("double-model");

const modelReset = document.getElementById("model-reset");

const form1 = document.querySelector('#input-prompt-1 .generate-form');
const form2 = document.querySelector('#input-prompt-2 .generate-form');


// Reset button 1 and 2 creation
const reset1 = document.createElement('button');
reset1.id = 'model-1-reset';
reset1.textContent = 'Reset this model';
reset1.addEventListener('click', function(){
    form1.querySelector('[name="max-token1"]').value = parseInt(50);
    form1.querySelector('[name="do-sample1"]').checked = false;
    form1.querySelector('[name="temperature1"]').value = parseFloat(0.8);
    form1.querySelector('[name="top-k1"]').value = parseInt(50);
    form1.querySelector('[name="top-p1"]').value = parseFloat(0.95);
    form1.querySelector('[name="repetition-penalty1"]').value = parseFloat(1.1);
    form1.querySelector('[name="enable-thinking1"]').checked = false;
})

const reset2 = document.createElement('button');
reset2.id = 'model-2-reset';
reset2.textContent = 'Reset this model';
reset2.addEventListener('click', function(){
    form2.querySelector('[name="max-token2"]').value = parseInt(50);
    form2.querySelector('[name="do-sample2"]').checked = false;
    form2.querySelector('[name="temperature2"]').value = parseFloat(0.8);
    form2.querySelector('[name="top-k2"]').value = parseInt(50);
    form2.querySelector('[name="top-p2"]').value = parseFloat(0.95);
    form2.querySelector('[name="repetition-penalty2"]').value = parseFloat(1.1);
    form2.querySelector('[name="enable-thinking2"]').checked = false;
})

// Swtiches from single model to double or back.
singleModel.addEventListener('click', function(){
    // change color
    singleModel.style.backgroundColor = "black";
    singleModel.style.color = "#dcdad4";
    doubleModel.style.backgroundColor = "";
    doubleModel.style.color = "black";
    modelReset.replaceChildren(reset2);
    //disable input
    document.querySelectorAll('#input-prompt-1 input').forEach(input => {
        input.disabled = true;
    });
    //reset input value
    form1.querySelector('[name="max-token1"]').value = parseInt(50);
    form1.querySelector('[name="do-sample1"]').checked = false;
    form1.querySelector('[name="temperature1"]').value = parseFloat(0.8);
    form1.querySelector('[name="top-k1"]').value = parseInt(50);
    form1.querySelector('[name="top-p1"]').value = parseFloat(0.95);
    form1.querySelector('[name="repetition-penalty1"]').value = parseFloat(1.1);
    form1.querySelector('[name="enable-thinking1"]').checked = false;
})

doubleModel.addEventListener('click', function(){
    doubleModel.style.backgroundColor = "black";
    doubleModel.style.color = "#dcdad4";
    singleModel.style.backgroundColor = "#dcdad4";
    singleModel.style.color = "black";
    singleModel.addEventListener("mousedown", function(){
        singleModel.style.backgroundColor = "#b6b4af";
    })
    singleModel.addEventListener("mouseup", function(){
        singleModel.style.backgroundColor = "#dcdad4";
    })
    modelReset.replaceChildren(reset1, reset2);
    document.querySelectorAll('#input-prompt-1 input').forEach(input => {
        input.disabled = false;
    });
})

// Call single button
modelReset.replaceChildren(reset2);



// TOGGLE INTERVENTION VISABILITY
const interventionToggle = document.getElementById("intervention-toggle");
const interventionVisibility = document.querySelector('#intervention .generate-form');
interventionToggle.addEventListener('change', function(){
    if (interventionToggle.checked) {
        interventionVisibility.style.display = '';
    } 
    else {
        interventionVisibility.style.display = 'none';
    }
})

// TOGGLE MLP AND ATTENTION DISPLAY
const interventionDisplay = document.getElementById("intervention-display");
const attentionDisplay = document.getElementById("attention-info");
const mlpDisplay = document.getElementById("mlp-info");

const attention = document.getElementById("attention");
const mlp = document.getElementById("mlp");

// Hides mlpDisplay
mlpDisplay.style.display = 'none';

// Toggle
type = "attention";

// Pre select attention
attention.style.backgroundColor = "black";
attention.style.color = "#dcdad4";

attention.addEventListener('click', function(){
    attention.style.backgroundColor = "black";
    attention.style.color = "#dcdad4";
    mlp.style.backgroundColor = "";
    mlp.style.color = "black";
    type = "attention";
    mlpDisplay.style.display = "none";
    attentionDisplay.style.display = "";
})

mlp.addEventListener('click', function(){
    mlp.style.backgroundColor = "black";
    mlp.style.color = "#dcdad4";
    attention.style.backgroundColor = "#dcdad4";
    attention.style.color = "black";
    type = "mlp";
    mlpDisplay.style.display = "";
    attentionDisplay.style.display = "none";
})

// RUN COMPARISON
const run = document.getElementById("run");

// Loading screen
let loadingTimer;

function startLoading() {
    const text1 = document.getElementById("model-1-text");
    const text2 = document.getElementById("model-2-text");
    let dots = 0;

    document.body.style.cursor = "wait";   // spinning cursor
    run.style.cursor = "wait";             // the button has its own cursor, so set it too
    text1.textContent = text2.textContent = "Generating";

    loadingTimer = setInterval(function () {
        dots = (dots + 1) % 4;                       // 0, 1, 2, 3, 0, ...
        const message = "Generating" + ".".repeat(dots);
        text1.textContent = message;
        text2.textContent = message;
    }, 400);
}

function stopLoading() {
    clearInterval(loadingTimer);           // stop the animation
    document.body.style.cursor = "";       // back to normal
    run.style.cursor = "";
}


run.addEventListener("click", async function(){
    // Preparing values
    const generation1 = {
        max_new_tokens: parseInt(form1.querySelector('[name="max-token1"]').value),
        do_sample: form1.querySelector('[name="do-sample1"]').checked,
        temperature: parseFloat(form1.querySelector('[name="temperature1"]').value),
        top_k: parseInt(form1.querySelector('[name="top-k1"]').value),
        top_p: parseFloat(form1.querySelector('[name="top-p1"]').value),
        repetition_penalty: parseFloat(form1.querySelector('[name="repetition-penalty1"]').value),
        enable_thinking: form1.querySelector('[name="enable-thinking1"]').checked,
    }

    let generation2;

    if(interventionToggle.checked == false){
        generation2 = {
            generation:{
                max_new_tokens: parseInt(form2.querySelector('[name="max-token2"]').value),
                do_sample: form2.querySelector('[name="do-sample2"]').checked,
                temperature: parseFloat(form2.querySelector('[name="temperature2"]').value),
                top_k: parseInt(form2.querySelector('[name="top-k2"]').value),
                top_p: parseFloat(form2.querySelector('[name="top-p2"]').value),
                repetition_penalty: parseFloat(form2.querySelector('[name="repetition-penalty2"]').value),
                enable_thinking: form2.querySelector('[name="enable-thinking2"]').checked,
            }
        }
    }
    else{
        // Create Layers
        const layers = [];
        document.querySelectorAll('.layers input').forEach((l) => {
            if(l.checked){
                layers.push(parseInt(l.name.slice(5)));
            }
        })

        if(type === "attention"){
            // Create head idxs
            const head_idxs = [];
            document.querySelectorAll('.idxs input').forEach((i) => {
                if(i.checked){
                    head_idxs.push(parseInt(i.name.slice(9)));
                }
            })

            generation2 = {
                generation:{
                    max_new_tokens: parseInt(form2.querySelector('[name="max-token2"]').value),
                    do_sample: form2.querySelector('[name="do-sample2"]').checked,
                    temperature: parseFloat(form2.querySelector('[name="temperature2"]').value),
                    top_k: parseInt(form2.querySelector('[name="top-k2"]').value),
                    top_p: parseFloat(form2.querySelector('[name="top-p2"]').value),
                    repetition_penalty: parseFloat(form2.querySelector('[name="repetition-penalty2"]').value),
                    enable_thinking: form2.querySelector('[name="enable-thinking2"]').checked,
                },
                intervention: {
                    type: type,
                    layers: layers,
                    head_idxs: head_idxs
                }
            }
        }
        else{
            // Get intervention value
            const proportion = document.querySelector('#mlp-info input[name="proportion"]').value;
            const seed = document.querySelector('#mlp-info input[name="seed"]').value;

            generation2 = {
                generation:{
                    max_new_tokens: parseInt(form2.querySelector('[name="max-token2"]').value),
                    do_sample: form2.querySelector('[name="do-sample2"]').checked,
                    temperature: parseFloat(form2.querySelector('[name="temperature2"]').value),
                    top_k: parseInt(form2.querySelector('[name="top-k2"]').value),
                    top_p: parseFloat(form2.querySelector('[name="top-p2"]').value),
                    repetition_penalty: parseFloat(form2.querySelector('[name="repetition-penalty2"]').value),
                    enable_thinking: form2.querySelector('[name="enable-thinking2"]').checked,
                },
                intervention: {
                    type: type,
                    layers: layers,
                    proportion: parseFloat(proportion),
                    seed: parseInt(seed)
                }
            }
        }
    }
    const promptInput = document.getElementById('prompt-input');

    // Creating submittion JSON file
    const submit = {
        prompt: promptInput.value,
        configuration_a: {
            generation: generation1
        },
        configuration_b: generation2
    };
    console.log(submit);
    
    // FETCH JSON FILE
    run.disabled = true; 
    //Loading icon
    startLoading();
    //retrieves Json files
    try {
        const response = await fetch("http://127.0.0.1:8000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submit)
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            // errors come back as { detail: [...] }
            const message = "Error: " + JSON.stringify(data.detail);
            document.getElementById("model-1-text").textContent = message;
            document.getElementById("model-2-text").textContent = message;
            return;
        }

        document.getElementById("model-1-text").textContent = data.condition_a_text;
        document.getElementById("model-2-text").textContent = data.condition_b_text;
        document.getElementById("condition-a-latency").textContent = data.condition_a_latency_ms + " ms";
        document.getElementById("condition-b-latency").textContent = data.condition_b_latency_ms + " ms";
    } catch (error) {
        console.error(error);
        document.getElementById("model-1-text").textContent = "Could not reach the backend.";
        document.getElementById("model-2-text").textContent = "Could not reach the backend.";
    } finally {
        stopLoading();
        run.disabled = false;  
    }
})






loadData();