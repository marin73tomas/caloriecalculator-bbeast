export default function calculate(program,age,weight,height,factor1,factor2) {
    
    
    
    let calories = (10 * weight + 6.25 * height - 10 * age + 5) * factor1 * factor2;
  
    switch (program) {
      case 1: //"12weeks"
        return {
          carbohydrate: Math.trunc((calories * 0.45) / 4),
          protein: Math.trunc((calories * 0.35) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case 2: //"mass"
        calories += 300;
        return {
          carbohydrate: Math.trunc((calories * 0.4) / 4),
          protein: Math.trunc((calories * 0.4) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case 3: //"xtremeshred"
        calories -= 300;
        return {
          carbohydrate: Math.trunc((calories * 0.2) / 4),
          protein: Math.trunc((calories * 0.5) / 4),
          fat: Math.trunc((calories * 0.3) / 9),
          calories: Math.trunc(calories),
        };
        break;
      case 4: //"beastnation"
        return {
          carbohydrate: Math.trunc((calories * 0.45) / 4),
          protein: Math.trunc((calories * 0.35) / 4),
          fat: Math.trunc((calories * 0.2) / 9),
          calories: Math.trunc(calories),
        };
        break;
    }
  }