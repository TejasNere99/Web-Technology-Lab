
function hello(){
    alert("Hello I am Button");
}

export function Button(){
    return(
        <button onClick={hello}>Hello I am Button</button>
    )
}