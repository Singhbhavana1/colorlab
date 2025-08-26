export const fetchColorNumber = async(r , g, b)=>{
    try {
        const res = await fetch(`https://www.thecolorapi.com/id?rgb=${r}, ${g}, ${b}`);
        const data = await res.json();
        // console.log(data);
        
        // console.log("color value",data.name.value);
        
        return data;
    } catch (error) {
        console.error(err);
        return "Unknown"
    }
}

export const fetchColorName = async (name) => {
  try {
    const res = await fetch(`https://api.color.pizza/v1/?name=${name}`);
    const data = await res.json();

    const exact = data.colors.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
// console.log("current color", exact);

    return exact || { name: "Unknown" };
  } catch (error) {
    console.error(error);
    return { name: "Unknown" };
  }
};

export const fetchColorComplimentry = async(hexCode, modeName) => {
    try {
        const res= await fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${modeName}&count=6`);
        const data = res.json();
         console.log(data);
        return data;
    } catch (error) {
        console.error(err);
        return "Unknown"
    }
}
