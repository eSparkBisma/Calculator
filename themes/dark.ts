// themes/dark.ts
export type Theme = {
    name: string;
    topbg: string;
    lowbg: string;
    headerIcon: string;
    text: string;    
    historyText:string;
    operationbuttonBackground: string;
    numberButtonBackground: string;
    operationText: string;
    numberText: string;
    equalsButton: string;
    menu: string;

    // Add more styles as needed
  };
  
  const darkTheme: Theme = {
    name: "dark",
    topbg: '#131212',
    lowbg: "#3d363636",
    headerIcon: "white",
    text: 'white',
    historyText: "#8f8b8b",
    operationbuttonBackground: "#3f3e3e61",
    numberButtonBackground: "#000000c8",
    operationText: "white",
    numberText: "white",
    equalsButton: "#e07340df",
    menu: "#242222"
    // Add more styles as needed
  };
  
  export default darkTheme;
  
  