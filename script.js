const inputSlider = document.querySelector("#slider");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDislay = document.querySelector("[data-PasswordDisplay]");

const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercse");
const numberCheck = document.querySelector("#Numbers");
const symbolCheck = document.querySelector("#Symbols");

const indicator = document.querySelector(".indicator");

const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*()_+-~`><,.":"?/|';


let password = "";
let passwordLength = 10;
let checkCount = 0;
sliderHandler();

function sliderHandler()
{
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function getRndInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRndInt()
{
    return getRndInt(0,9);
}

function uppercase()
{
    return String.fromCharCode(getRndInt(65,91));
}
 
function lowercase() {
    return String.fromCharCode(getRndInt(97, 123));
}


function generateSymb()
{

    const rndNum = getRndInt(0, symbols.length);
    return symbols.charAt(rndNum);

}

function setIndicator(color) {
        indicator.style.backgroundColor = color;
}
    


function calcstrength()
{
    let hasUpper = false;
    let haslower = false;
    let hasNumber = false;
    let hasSymbols = false;

    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) haslower = true;
    if(numberCheck.checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbols = true;

    if(hasUpper && haslower && (hasNumber || hasSymbols) && passwordLength >= 8)
    {
         setIndicator("#0f0");
    }

    if((haslower || hasUpper) && (hasNumber || hasSymbols) && passwordLength >=6)
    {
        setIndicator("#ff0");
    }
    else{

        setIndicator("#f00");
    }

}

async function copycontent()
{
    try{

        await navigator.clipboard.writeText(passwordDislay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){

        copyMsg.innerText = "failed";

    }

    // to make copy wala message visible
    copyMsg.classList.add("active");

    // time out for copy wala message it will remove after 2 sec
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


function passwordShuffle(array)
{
    // shuffle karne ka ek algorithm hota hai (Fisher yates method)
    //ye samjhna baki hai

    for(let i= array.length-1; i>0; i--)
    {
        const j = Math.floor(Math.random() * (i +1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function checkboxchange(){
    checkCount =0;
   allCheckBox.forEach((checkbox)=>{
        
        if(checkbox.checked)
             checkCount++;
    });
}

//special condition

if(passwordLength < checkCount)
{
    passwordLength = checkCount;
    sliderHandler();
}
console.log("Hii");

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', checkboxchange);
    
})




inputSlider.addEventListener('input', (h) => {

    passwordLength = h.target.value;
    sliderHandler();

})

copyBtn.addEventListener('click', ()=> {

    if(passwordDislay.value)
    {
        copycontent();
    }
})

generateBtn.addEventListener('click' , ()=>{

    if(checkCount == 0) return;

    if(passwordLength < checkCount)
  {
    passwordLength = checkCount;
    sliderHandler();
  }

  //remove old password
  password="";

  let funcArr = [];

if(upperCaseCheck.checked)
    funcArr.push(uppercase);

    if (lowerCaseCheck && lowerCaseCheck.checked) {
        funcArr.push(lowercase());
    }
    
   
if(numberCheck.checked)
    funcArr.push(generateRndInt);


if(symbolCheck.checked)
    funcArr.push(generateSymb);

     //compulsory addition
    for(let i =0; i<funcArr.length; i++)
    {
        password += funcArr[i]();
    }

    //remaining addition 

    for(let i=0; i<passwordLength-funcArr.length; i++)
    {
        let rndIndex = getRndInt(0, funcArr.length);
        password += funcArr[rndIndex]();
    }
    console.log("reamining dine");

    //mixing or shuffle the password
    password = passwordShuffle(Array.from(password));

    //show in UI 

    passwordDislay.value = password;

    // calculate the strength of the password

    calcstrength();



    console.log("Hii");
})