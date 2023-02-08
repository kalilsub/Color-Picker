
const colorEl = document.getElementById("color-picker")
const selectEl = document.getElementById("schemes")
const formEl = document.getElementById("color-form")



formEl.addEventListener("submit", (event)=> {

    event.preventDefault()
    const hexVal = colorEl.value.substring(1) //remove the hashtag from the string
    const formData = {mode: selectEl.value, hex: hexVal}

    fetch(`https://www.thecolorapi.com/scheme?hex=${formData.hex}&mode=${formData.mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            let palette = ``
            data.colors.forEach(element => {
                let colorValue = element.hex.value
                palette +=`
                        <div class="palette">
                            <div class="placeholder" id="${colorValue}" style="background-color:${colorValue}"><p class="color-text">${element.name.value}</p></div>
                            <div class="color-info" id="${colorValue}">${colorValue}</div>
                        </div>
                        `
                    });
            document.getElementById("color-container").innerHTML = palette   
            document.getElementById("color-container").addEventListener("click", copyHexCode)              
        }) 
})



function copyHexCode(event) {
    navigator.clipboard.writeText(event.target.id)
    alert("Copied Color: " + event.target.id)
    
}



